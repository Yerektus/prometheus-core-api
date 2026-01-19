import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { UserResource } from './resources/user.resource';
import { UserRepository } from './data/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDao])],
  providers: [UserResource, UserRepository],
  exports: [UserRepository, UserResource],
})
export class UsersModule {}
