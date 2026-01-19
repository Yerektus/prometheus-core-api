import { HttpStatus, Injectable } from '@nestjs/common';
import { UserAccessTokensRepository } from '../data/user-access-tokens.repository';
import { UserRepository } from 'src/modules/users/data/user.repository';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { hashPassword } from 'src/common/utils/hash-password';
import { JwtService } from '@nestjs/jwt';
import { UserDao } from 'src/common/dao/user.dao';
import { AuthEntity } from 'src/common/entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userAccessTokensRepository: UserAccessTokensRepository,
    private readonly usersRepository: UserRepository,
  ) {}

  async register(payload: CreateUserDto): Promise<[UserDao, AuthEntity]> {
    const existUser = await this.usersRepository.getUserByEmail(payload.email);

    if (existUser) {
      throw buildHttpError(ErrorCode.UserAlreadyExist, HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.usersRepository.insertAndGetUser({
      ...payload,
      password: await hashPassword(payload.password),
    });

    const auth = await this.createAndGetAccessToken(createdUser.id);

    return [createdUser, auth];
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
    return this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: 'todo-secret',
      },
    );
  }
}
