import { forwardRef, Module } from '@nestjs/common';
import { FireSensorsController } from './presenter/fire-sensors.controller';
import { FireSensorsResource } from './presenter/resources/fire-sensors.resource';
import { FireSensorsService } from './domain/fire-sensors.service';
import { FireSensorsRepository } from './data/fire-sensors.repository';
import { LocationsModule } from '../locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FireSensorDao } from 'src/common/dao/fire-sensor.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([FireSensorDao]),
    forwardRef(() => LocationsModule),
  ],
  controllers: [FireSensorsController],
  providers: [FireSensorsResource, FireSensorsService, FireSensorsRepository],
  exports: [FireSensorsResource, FireSensorsService],
})
export class FireSensorsModule {}
