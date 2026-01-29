import { Injectable } from '@nestjs/common';
import { FireSensorEntity } from 'src/common/entities/fire-sensor.entity';
import { LocationResource } from 'src/modules/locations/presenter/resources/locations.resource';

@Injectable()
export class FireSensorsResource {
  constructor(private readonly locationResource: LocationResource) {}

  convert(payload: FireSensorEntity) {
    return {
      serial_number: payload.serialNumber,
      model: payload.model,
      is_active: payload.isActive,
      installed_at: payload.installedAt,
      location: this.locationResource.convert(payload.location),
    };
  }
}
