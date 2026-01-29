import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FireSensorDao } from 'src/common/dao/fire-sensor.dao';
import { FireSensorEntity } from 'src/common/entities/fire-sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FireSensorsRepository {
  constructor(
    @InjectRepository(FireSensorDao)
    private readonly fireSensorsRepository: Repository<FireSensorDao>,
  ) {}

  getFireSensors(): Promise<FireSensorEntity[]> {
    return this.fireSensorsRepository.find();
  }

  getFireSensorById(fireSensorId: string): Promise<FireSensorEntity | null> {
    return this.fireSensorsRepository.findOne({
      where: {
        id: fireSensorId,
      },
    });
  }
}
