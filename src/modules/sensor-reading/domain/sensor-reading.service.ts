import { HttpStatus, Injectable } from '@nestjs/common';
import { SensorReadingRepository } from '../data/sensor-reading.repository';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { SensorReadingEntity } from 'src/common/entities/sensor-reading.entity';
import { CreateSensorReadingDto } from '../dto/create-sensor-reading.dto';

@Injectable()
export class SensorReadingService {
  constructor(
    private readonly sensorReadingRepository: SensorReadingRepository,
  ) {}

  async createSensorReading(payload: CreateSensorReadingDto) {
    const sensorReading =
      await this.sensorReadingRepository.insertAndGetSensorReading(payload);

    if (!sensorReading) {
      throw buildHttpError(
        ErrorCode.SensorReadingNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return sensorReading;
  }

  async getSensorReadingById(sensorReadingId: string) {
    const sensorReading =
      await this.sensorReadingRepository.getSensorReadingById(sensorReadingId);

    if (!sensorReading) {
      throw buildHttpError(
        ErrorCode.SensorReadingNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return sensorReading;
  }

  getSensorReadings(
    limit: number = 10,
    page: number = 1,
  ): Promise<SensorReadingEntity[]> {
    return this.sensorReadingRepository.getSensorReadings(limit, page);
  }
}
