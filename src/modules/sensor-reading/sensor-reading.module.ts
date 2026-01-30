import { Module } from '@nestjs/common';
import { SensorReadingController } from './presenter/sensor-reading.controller';
import { SensorReadingRepository } from './data/sensor-reading.repository';
import { SensorReadingService } from './domain/sensor-reading.service';
import { SensorReadingResource } from './presenter/resources/sensor-reading.resource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorReadingDao } from 'src/common/dao/sensor-reading.dao';

@Module({
  imports: [TypeOrmModule.forFeature([SensorReadingDao])],
  controllers: [SensorReadingController],
  providers: [
    SensorReadingRepository,
    SensorReadingService,
    SensorReadingResource,
  ],
})
export class SensorReadingModule {}
