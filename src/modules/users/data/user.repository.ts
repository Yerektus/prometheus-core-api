import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly userRepository: Repository<UserDao>,
  ) {}

  insertAndGetUser(payload: CreateUserDto): Promise<UserDao> {
    return this.userRepository.save({
      id: uuidv4(),
      role: payload.role,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumbers: payload.phoneNumbers,
      password: payload.password,
    });
  }

  getUserByEmail(email: string): Promise<UserDao | null> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  getUserById(id: string): Promise<UserDao | null> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
