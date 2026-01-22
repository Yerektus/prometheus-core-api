import { forwardRef, Module } from '@nestjs/common';
import { LocationsController } from './presenter/locations.controller';
import { LocationsService } from './domain/locations.service';
import { LocationsRepository } from './data/locations.repository';
import { LocationResource } from './presenter/resources/locations.resource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationDao } from 'src/common/dao/location.dao';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationDao]),
    forwardRef(() => UsersModule),
  ],
  controllers: [LocationsController],
  providers: [LocationsService, LocationsRepository, LocationResource],
  exports: [LocationsService],
})
export class LocationsModule {}
