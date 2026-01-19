import { BaseEntity } from './base.entity';
import { LocationEntity } from './location.entity';
import { SensorReadingEntity } from './sensor-reading.entity';

export class FireSensorEntity extends BaseEntity {
  serialNumber: string | null;
  model: string | null;
  isActive: boolean;
  installedAt: Date | null;
  location: LocationEntity;
  sensorRedings: SensorReadingEntity[];
}
