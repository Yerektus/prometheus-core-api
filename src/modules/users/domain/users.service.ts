import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../data/users.repository';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string) {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw buildHttpError(ErrorCode.UserNotFound, HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
