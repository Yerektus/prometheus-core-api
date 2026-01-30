import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorReadingDao } from 'src/common/dao/sensor-reading.dao';
import { SensorReadingEntity } from 'src/common/entities/sensor-reading.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SensorReadingRepository {
  constructor(
    @InjectRepository(SensorReadingDao)
    private readonly sensorReadingRepository: Repository<SensorReadingDao>,
  ) {}

  getSensorReadingById(
    sensorReadingId: string,
  ): Promise<SensorReadingEntity | null> {
    return this.sensorReadingRepository.findOne({
      where: {
        id: sensorReadingId,
      },
    });
  }

  getSensorReadings(
    limit: number,
    page: number,
  ): Promise<SensorReadingEntity[]> {
    return this.sensorReadingRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
