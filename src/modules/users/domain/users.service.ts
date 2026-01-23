import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../data/users.repository';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(payload: CreateUserDto) {
    const user = await this.usersRepository.getUserByEmailOrUsername(
      payload.email,
      payload.username,
    );

    if (user) {
      throw buildHttpError(ErrorCode.UserAlreadyExist, HttpStatus.BAD_REQUEST);
    }

    const savedUser = await this.usersRepository.insertAndGetUser(payload);

    if (!savedUser) {
      throw buildHttpError(
        ErrorCode.InternalServerError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return savedUser;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw buildHttpError(ErrorCode.UserNotFound, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  getUsers(): Promise<UserEntity[]> {
    return this.usersRepository.getUsers();
  }
}
