import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseDao } from './base.dao';
import { LocationDao } from './location.dao';
import { SensorReadingDao } from './sensor-reading.dao';

@Entity({ name: 'fire_sensors' })
export class FireSensorDao extends BaseDao {
  @Column({ name: 'serial_number', type: 'varchar', length: 50 })
  serialNumber: string | null;

  @Column({ name: 'model', type: 'varchar', length: 50 })
  model: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Column({
    name: 'installed_at',
    type: 'timestamp with time zone',
  })
  installedAt: Date | null;

  @ManyToOne(() => LocationDao, (location) => location.fireSensors)
  location: LocationDao;

  @OneToMany(() => SensorReadingDao, (sensorReding) => sensorReding.fireSensor)
  sensorRedings: SensorReadingDao[];
}
