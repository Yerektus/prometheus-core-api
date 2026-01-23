import { HttpStatus, Injectable } from '@nestjs/common';
import { UserAccessTokensRepository } from '../data/user-access-tokens.repository';
import { UsersRepository } from 'src/modules/users/data/users.repository';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { comparePassword, hashPassword } from 'src/common/utils/hash-password';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from 'src/common/entities/auth.entity';
import { UserEntity } from 'src/common/entities/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userAccessTokensRepository: UserAccessTokensRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register(payload: CreateUserDto): Promise<[UserEntity, AuthEntity]> {
    const existUser = await this.usersRepository.getUserByEmailOrUsername(
      payload.email,
      payload.username,
    );

    if (existUser) {
      throw buildHttpError(ErrorCode.UserAlreadyExist, HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.usersRepository.insertAndGetUser({
      ...payload,
      password: await hashPassword(payload.password),
    });

    if (!createdUser) {
      throw buildHttpError(
        ErrorCode.InternalServerError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const auth = await this.createAndGetAccessToken(createdUser.id);

    return [createdUser, auth];
  }

  async login(payload: LoginUserDto): Promise<[UserEntity, AuthEntity]> {
    const existUser = await this.usersRepository.getUserByEmail(payload.email);

    if (!existUser) {
      throw buildHttpError(ErrorCode.UserNotFound, HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await comparePassword(
      payload.password,
      existUser.password,
    );
    if (!isPasswordValid) {
      throw buildHttpError(
        ErrorCode.CredentialsAreInvalid,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const auth = await this.createAndGetAccessToken(existUser.id);

    return [existUser, auth];
  }

  async validate(token: string): Promise<UserEntity | null> {
    const userAccessToken =
      await this.userAccessTokensRepository.getOneByToken(token);

    if (!userAccessToken) {
      return null;
    }

    const user = await this.usersRepository.getUserById(userAccessToken.userId);

    return user ?? null;
  }

  private async createAndGetAccessToken(userId: string) {
    const accessToken = await this.generateAccessToken(userId);

    await this.userAccessTokensRepository.insertAndGetUserAccessToken(
      userId,
      accessToken,
    );

    return {
      accessToken: accessToken,
    };
  }

  private generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
    });
  }
}
