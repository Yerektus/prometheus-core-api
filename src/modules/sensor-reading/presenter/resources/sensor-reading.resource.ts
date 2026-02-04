import { Injectable } from '@nestjs/common';
import { SensorReadingEntity } from 'src/common/entities/sensor-reading.entity';

@Injectable()
export class SensorReadingResource {
  convert(payload: SensorReadingEntity) {
    return {
      id: payload.id,
      temperature_c: payload.temperatureC,
      humidity_pct: payload.humidityPct,
      gas_ppm: payload.gasPpm,
      recordedAt: payload.recordedAt,

      ...(payload.fireSensor
        ? {
            fire_sensor: {
              id: payload.fireSensor.id,
              serial_number: payload.fireSensor.serialNumber,
              model: payload.fireSensor.model,
              is_active: payload.fireSensor.isActive,
              installed_at: payload.fireSensor.installedAt,
              ...(payload.fireSensor.location
                ? {
                    location: {
                      id: payload.fireSensor.location.id,
                      country: payload.fireSensor.location.country,
                      city: payload.fireSensor.location.city,
                      address: payload.fireSensor.location.address,
                      floor: payload.fireSensor.location.floor,
                      flat: payload.fireSensor.location.flat,
                    },
                  }
                : {}),
            },
          }
        : {}),
    };
  }
}
