import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccessTokenDao } from 'src/common/dao/user-access-token.dao';
import { AuthController } from './presenter/auth.controller';
import { AuthService } from './domain/auth.service';
import { AuthResource } from './presenter/resources/auth.resource';
import { UserAccessTokensRepository } from './data/user-access-tokens.repository';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './stratigies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    TypeOrmModule.forFeature([UserAccessTokenDao]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const jwtConfig = getJwtConfig();

        return {
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.accessTokenTtl,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResource,
    UserAccessTokensRepository,
    JwtStrategy,
  ],
})
export class AuthModule {}
