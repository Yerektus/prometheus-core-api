import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccessTokenDao } from 'src/common/dao/user-access-token.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccessTokenDao]),
    JwtModule.register({}),
  ],
})
export class AuthModule {}
