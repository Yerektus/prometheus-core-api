import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDao } from './base.dao';
import { FireSensorDao } from './fire-sensor.dao';

@Entity({ name: 'sensor_readings' })
export class SensorReadingDao extends BaseDao {
  @Column({
    name: 'temperature_c',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  temperatureC: number;

  @Column({
    name: 'humidity_pct',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  humidityPct: number;

  @Column({
    name: 'gas_ppm',
    type: 'decimal',
    precision: 8,
    scale: 2,
  })
  gasPpm: number;

  @Column({ name: 'recorded_at', type: 'time with time zone' })
  recordedAt: Date;

  @Column({ name: 'fire_sensor_id', type: 'uuid' })
  fire_sensor_id: string;

  @ManyToOne(() => FireSensorDao, (fireSensor) => fireSensor.sensorRedings)
  @JoinColumn({ name: 'fire_sensor_id' })
  fireSensor: FireSensorDao;
}
