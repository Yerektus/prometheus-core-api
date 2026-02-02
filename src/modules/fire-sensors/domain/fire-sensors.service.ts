import { HttpStatus, Injectable } from '@nestjs/common';
import { FireSensorsRepository } from '../data/fire-sensors.repository';
import { FireSensorEntity } from 'src/common/entities/fire-sensor.entity';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { CreateLocationAndFireSensorDto } from '../dto/create-location-and-fire-sensor.dto';
import { UpdateLocationAndFireSensorDto } from '../dto/update-location-and-fire-sensor';

@Injectable()
export class FireSensorsService {
  constructor(private readonly fireSensorsRepository: FireSensorsRepository) {}

  async createFireSensorAndLocation(
    payload: CreateLocationAndFireSensorDto,
  ): Promise<FireSensorEntity> {
    const fireSensor =
      await this.fireSensorsRepository.insertAndGetLocationAndFireSensor(
        payload,
      );

    if (!fireSensor) {
      throw buildHttpError(
        ErrorCode.InternalServerError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return fireSensor;
  }

  async updateFireSensorAndLocation(
    fireSensorId: string,
    payload: UpdateLocationAndFireSensorDto,
  ): Promise<FireSensorEntity> {
    const fireSensor =
      await this.fireSensorsRepository.updateLocationAndFireSensor(
        fireSensorId,
        payload,
      );

    if (!fireSensor) {
      throw buildHttpError(
        ErrorCode.InternalServerError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return fireSensor;
  }

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
