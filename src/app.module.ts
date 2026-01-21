import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { getAppConfig } from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserDao } from './common/dao/user.dao';
import { UserAccessTokenDao } from './common/dao/user-access-token.dao';
import { getJwtConfig } from './config/jwt.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [getDatabaseConfig, getAppConfig, getJwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const databaseConfig = getDatabaseConfig();

        return {
          type: 'postgres',
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          entities: [UserDao, UserAccessTokenDao],
          synchronize: false,
        };
      },
    }),
  ],
})
export class AppModule {}
