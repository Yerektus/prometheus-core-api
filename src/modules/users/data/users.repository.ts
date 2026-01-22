import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from 'src/common/entities/user.entity';
import { RoleDao } from 'src/common/dao/role.dao';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly userRepository: Repository<UserDao>,
    private readonly dataSource: DataSource,
  ) {}

  insertAndGetUser(payload: CreateUserDto): Promise<UserEntity | null> {
    return this.dataSource.transaction(async (manager) => {
      const rolesRepo = manager.getRepository(RoleDao);

      const userRole = await rolesRepo.findOne({
        where: {
          name: 'USER',
        },
      });

      if (!userRole) {
        return null;
      }

      const user = await this.userRepository.save({
        id: uuidv4(),
        email: payload.email,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumbers: payload.phoneNumbers,
        password: payload.password,
      });

      await this.userRepository
        .createQueryBuilder()
        .relation(UserDao, 'roles')
        .of(user.id)
        .add(userRole.id);

      const userWithRole = await this.userRepository.findOne({
        where: {
          id: user.id,
        },
        relations: { roles: true },
      });

      if (!userWithRole) {
        return null;
      }

      return userWithRole;
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
      relations: {
        roles: true,
      },
    });
  }
}
