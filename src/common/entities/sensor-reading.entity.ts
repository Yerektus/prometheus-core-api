import { BaseEntity } from './base.entity';
import { FireSensorEntity } from './fire-sensor.entity';

export class SensorReadingEntity extends BaseEntity {
  temperatureC: number;
  humidityPct: number;
  gasPpm: number;
  recordedAt: Date;
  fire_sensor_id: string;
  fireSensor: FireSensorEntity;
}
