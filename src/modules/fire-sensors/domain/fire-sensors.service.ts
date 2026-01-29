import { HttpStatus, Injectable } from '@nestjs/common';
import { FireSensorsRepository } from '../data/fire-sensors.repository';
import { FireSensorEntity } from 'src/common/entities/fire-sensor.entity';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';

@Injectable()
export class FireSensorsService {
  constructor(private readonly fireSensorsRepository: FireSensorsRepository) {}

  getFireSensors(): Promise<FireSensorEntity[]> {
    return this.fireSensorsRepository.getFireSensors();
  }

  async getFireSensorById(fireSensorId: string) {
    const fireSensor =
      await this.fireSensorsRepository.getFireSensorById(fireSensorId);

    if (!fireSensor) {
      throw buildHttpError(ErrorCode.FireSensorNotFound, HttpStatus.NOT_FOUND);
    }

    return fireSensor;
  }
}
