import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { UserResource } from './presenter/resources/user.resource';
import { UsersRepository } from './data/users.repository';
import { UsersService } from './domain/users.service';
import { UsersController } from './presenter/users.controller';
import { RolesModule } from '../roles/roles.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDao]),
    RolesModule,
    forwardRef(() => LocationsModule),
  ],
  controllers: [UsersController],
  providers: [UserResource, UsersRepository, UsersService],
  exports: [UsersRepository, UserResource],
})
export class UsersModule {}
