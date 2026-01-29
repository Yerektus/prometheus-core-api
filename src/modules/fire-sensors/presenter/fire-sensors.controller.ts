import { Controller, Get, Param } from '@nestjs/common';
import { FireSensorsService } from '../domain/fire-sensors.service';
import { FireSensorsResource } from './resources/fire-sensors.resource';
import { GetFireSensorIdParam } from './resources/params/get-fire-sensor-id.param';

@Controller('/v1/fire_sensors')
export class FireSensorsController {
  constructor(
    private readonly fireSensorsService: FireSensorsService,
    private readonly fireSensorsResource: FireSensorsResource,
  ) {}

  @Get('/')
  async getFireSensors() {
    const fireSensors = await this.fireSensorsService.getFireSensors();

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
}
