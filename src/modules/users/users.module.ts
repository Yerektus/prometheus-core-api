import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { UserResource } from './presenter/resources/user.resource';
import { UsersRepository } from './data/users.repository';
import { UsersService } from './domain/users.service';
import { UsersController } from './presenter/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDao])],
  controllers: [UsersController],
  providers: [UserResource, UsersRepository, UsersService],
  exports: [UsersRepository, UserResource],
})
export class UsersModule {}
