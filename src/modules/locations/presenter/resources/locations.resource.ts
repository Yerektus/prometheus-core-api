import { Injectable } from '@nestjs/common';
import { LocationEntity } from 'src/common/entities/location.entity';
import { FireSensorsResource } from 'src/modules/fire-sensors/presenter/resources/fire-sensors.resource';

@Injectable()
export class LocationResource {
  constructor(private readonly fireSensorResource: FireSensorsResource) {}

  convert(payload: LocationEntity) {
    return {
      id: payload.id,
      country: payload.country,
      city: payload.city,
      address: payload.address,
      floor: payload.floor,
      flat: payload.flat,
      fire_sensors: payload.fireSensors?.map((fireSensor) =>
        this.fireSensorResource.convert(fireSensor),
      ),
    };
  }
}
