import { BaseEntity } from './base.entity';
import { FireSensorEntity } from './fire-sensor.entity';
import { UserEntity } from './user.entity';

export class LocationEntity extends BaseEntity {
  country: string;
  city: string;
  address: string;
  floor: string | null;
  room: string | null;
  latitude: number;
  longitude: number;
  users?: UserEntity[];
  fireSensor?: FireSensorEntity[];
}
