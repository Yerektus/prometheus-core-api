import { Injectable } from '@nestjs/common';
import { FireSensorEntity } from 'src/common/entities/fire-sensor.entity';

@Injectable()
export class FireSensorsResource {
  convert(payload: FireSensorEntity) {
    return {
      id: payload.id,
      serial_number: payload.serialNumber,
      model: payload.model,
      is_active: payload.isActive,
      installed_at: payload.installedAt,
      location: {
        id: payload.location.id,
        country: payload.location.country,
        city: payload.location.city,
        address: payload.location.address,
        floor: payload.location.floor,
        room: payload.location.room,
      },
    };
  }
}
