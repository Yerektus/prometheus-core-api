import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FireSensorsService } from '../domain/fire-sensors.service';
import { FireSensorsResource } from './resources/fire-sensors.resource';
import { GetFireSensorIdParam } from './params/get-fire-sensor-id.param';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { CreateLocationAndFireSensorBody } from 'src/modules/fire-sensors/presenter/bodies/create-location-and-fire-sensor.body';
import { UpdateLocationAndFireSensorBody } from './bodies/update-location-and-fire-sensor.body';

@Controller('/v1/fire_sensors')
export class FireSensorsController {
  constructor(
    private readonly fireSensorsService: FireSensorsService,
    private readonly fireSensorsResource: FireSensorsResource,
  ) {}

  @Authorization('USER')
  @Post()
  async createFireSensorAndLocation(
    @Body() body: CreateLocationAndFireSensorBody,
  ) {
    const fireSensor =
      await this.fireSensorsService.createFireSensorAndLocation({
        ownerId: body.owner_id,
        country: body.country,
        city: body.city,
        address: body.address,
        floor: body.floor,
        flat: body.flat,
        serialNumber: body.serial_number,
        model: body.model,
      });

    return {
      data: this.fireSensorsResource.convert(fireSensor),
    };
  }

  @Authorization('USER')
  @Patch('/:fire_sensor_id')
  async updateFireSensorAndLocation(
    @Param() param: GetFireSensorIdParam,
    @Body() body: UpdateLocationAndFireSensorBody,
  ) {
    const fireSensor =
      await this.fireSensorsService.updateFireSensorAndLocation(
        param.fire_sensor_id,
        {
          ownerId: body.owner_id,
          locationId: body.location_id,
          country: body.country,
          city: body.city,
          address: body.address,
          floor: body.floor,
          flat: body.flat,
          serialNumber: body.serial_number,
          model: body.model,
        },
      );

    return {
      data: this.fireSensorsResource.convert(fireSensor),
    };
  }

  @Get('/')
  async getFireSensors() {
    const fireSensors = await this.fireSensorsService.getFireSensors();

    return {
      data: fireSensors.map((fireSensor) =>
        this.fireSensorsResource.convert(fireSensor),
      ),
    };
  }

  @Get('/sensor_readings')
  async getFireSensorsWithSensorReadings() {
    const fireSensors =
      await this.fireSensorsService.getFireSensorsWithSensorReadings();

    return {
      data: fireSensors.map((fireSensor) =>
        this.fireSensorsResource.convert(fireSensor),
      ),
    };
  }

  @Get('/')
  async getFireSensorById(@Param() param: GetFireSensorIdParam) {
    const fireSensor = await this.fireSensorsService.getFireSensorById(
      param.fire_sensor_id,
    );

    return {
      data: this.fireSensorsResource.convert(fireSensor),
    };
  }

  @Authorization('USER')
  @Delete('/:fire_sensor_id')
  async deleteFireSensorById(@Param() param: GetFireSensorIdParam) {
    await this.fireSensorsService.deleteFireSensorById(param.fire_sensor_id);
  }
}
