import { Controller, Param, Query } from '@nestjs/common';
import { SensorReadingService } from '../domain/sensor-reading.service';
import { GetSensorReadingIdParam } from './params/get-sensor-reading-id.param';
import { SensorReadingResource } from './resources/sensor-reading.resource';
import { GetSensorReadingsPaginationQuery } from './queries/get-sensor-readings-pagination.query';

@Controller('/v1/sensor-reading')
export class SensorReadingController {
  constructor(
    private readonly sensorReadingService: SensorReadingService,
    private readonly sensorReadingResource: SensorReadingResource,
  ) {}

  async getSensorReadingById(@Param() param: GetSensorReadingIdParam) {
    const sensorReading = await this.sensorReadingService.getSensorReadingById(
      param.sensor_reading_id,
    );

    return {
      data: this.sensorReadingResource.convert(sensorReading),
    };
  }

  async getSensorReadings(@Query() query: GetSensorReadingsPaginationQuery) {
    const sensorReadings = await this.sensorReadingService.getSensorReadings(
      query.limit,
      query.page,
    );

    return {
      data: sensorReadings.map((sensorReading) =>
        this.sensorReadingResource.convert(sensorReading),
      ),
    };
  }
}
