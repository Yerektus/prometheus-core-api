import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';

@Module({
  imports: [TypeOrmModule.forFeature([UserDao])],
})
export class UsersModule {}
