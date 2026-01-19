import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccessTokenDao } from 'src/common/dao/user-access-token.dao';
import { AuthController } from './presenter/auth.controller';
import { AuthService } from './domain/auth.service';
import { AuthResource } from './presenter/resources/auth.resource';
import { UserAccessTokensRepository } from './data/user-access-tokens.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserAccessTokenDao]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthResource, UserAccessTokensRepository],
})
export class AuthModule {}
