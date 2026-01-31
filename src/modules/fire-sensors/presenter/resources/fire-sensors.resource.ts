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
        users: payload.location.users?.map((user) => ({
          id: user.id,
          last_name: user.lastName,
          first_name: user.firstName,
          email: user.email,
          phone_number: user.phoneNumbers,
          username: user.username,
        })),
      },
    };
  }
}
