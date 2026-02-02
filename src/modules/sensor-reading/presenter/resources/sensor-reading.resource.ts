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
    };
  }
}
