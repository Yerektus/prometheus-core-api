import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SensorReadingService } from '../domain/sensor-reading.service';
import { GetSensorReadingIdParam } from './params/get-sensor-reading-id.param';
import { SensorReadingResource } from './resources/sensor-reading.resource';
import { GetSensorReadingsPaginationQuery } from './queries/get-sensor-readings-pagination.query';
import { CreateSensorReadingBody } from './bodies/create-sensor-reading.body';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { GetFireSensorIdParam } from 'src/modules/fire-sensors/presenter/params/get-fire-sensor-id.param';

@Controller('/v1/sensor_readings')
export class SensorReadingController {
  constructor(
    private readonly sensorReadingService: SensorReadingService,
    private readonly sensorReadingResource: SensorReadingResource,
  ) {}

  @Authorization('USER')
  @Post()
  async createSensorReading(@Body() body: CreateSensorReadingBody) {
    const sensorReading = await this.sensorReadingService.createSensorReading({
      fireSensorId: body.fire_sensor_id,
      humidityPct: body.humidity_pct,
      temperatureC: body.temperature_c,
      gasPpm: body.gas_ppm,
    });

    return {
      data: this.sensorReadingResource.convert(sensorReading),
    };
  }

  @Authorization('USER')
  @Get('/:sensor_reading_id')
  async getSensorReadingById(@Param() param: GetSensorReadingIdParam) {
    const sensorReading = await this.sensorReadingService.getSensorReadingById(
      param.sensor_reading_id,
    );

    return {
      data: this.sensorReadingResource.convert(sensorReading),
    };
  }

  @Authorization('USER')
  @Get('/fire_sensors/:fire_sensor_id')
  async getSensorReadingByFireSensorId(@Param() param: GetFireSensorIdParam) {
    const sensorReading =
      await this.sensorReadingService.getSensorReadingsByFireSensorId(
        param.fire_sensor_id,
      );

    return {
      data: sensorReading.map((reading) =>
        this.sensorReadingResource.convert(reading),
      ),
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
