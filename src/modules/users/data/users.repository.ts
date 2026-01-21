import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly userRepository: Repository<UserDao>,
  ) {}

  insertAndGetUser(payload: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save({
      id: uuidv4(),
      role: 'user',
      email: payload.email,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumbers: payload.phoneNumbers,
      password: payload.password,
    });
  }

  getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  getUserById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
