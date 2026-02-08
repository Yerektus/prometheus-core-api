import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorReadingDao } from 'src/common/dao/sensor-reading.dao';
import { SensorReadingEntity } from 'src/common/entities/sensor-reading.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateSensorReadingDto } from '../dto/create-sensor-reading.dto';
import { FireSensorDao } from 'src/common/dao/fire-sensor.dao';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SensorReadingRepository {
  constructor(
    @InjectRepository(SensorReadingDao)
    private readonly sensorReadingRepository: Repository<SensorReadingDao>,
    private readonly dataSource: DataSource,
  ) {}

  async insertAndGetSensorReading(
    payload: CreateSensorReadingDto,
  ): Promise<SensorReadingEntity | null> {
    console.log(payload);
    return this.dataSource.transaction(async (manager) => {
      const fireSensorRepo = manager.getRepository(FireSensorDao);
      const sensorReadingRepo = manager.getRepository(SensorReadingDao);

      const fireSensor = await fireSensorRepo.findOne({
        where: {
          id: payload.fireSensorId,
        },
      });

      if (!fireSensor) {
        return null;
      }

      return sensorReadingRepo.save({
        id: uuidv4(),
        temperatureC: payload.temperatureC,
        humidityPct: payload.humidityPct,
        gasPpm: payload.gasPpm,
        recordedAt: new Date(),
        fireSensor: {
          id: fireSensor.id,
        },
      });
    });
  }

  getSensorReadingById(
    sensorReadingId: string,
  ): Promise<SensorReadingEntity | null> {
    return this.sensorReadingRepository.findOne({
      where: {
        id: sensorReadingId,
      },
      relations: {
        fireSensor: {
          location: true,
        },
      },
    });
  }

  getSensorReadingsByFireSensorId(
    fireSensorId: string,
  ): Promise<SensorReadingEntity[]> {
    return this.sensorReadingRepository.find({
      where: {
        fireSensorId: fireSensorId,
      },
      relations: {
        fireSensor: {
          location: true,
        },
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
