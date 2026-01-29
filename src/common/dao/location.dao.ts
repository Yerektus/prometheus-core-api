import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseDao } from './base.dao';
import { FireSensorDao } from './fire-sensor.dao';
import { UserDao } from './user.dao';

@Entity({ name: 'locations' })
export class LocationDao extends BaseDao {
  @Column({ name: 'country', type: 'varchar', length: 255, nullable: false })
  country: string;

  @Column({ name: 'city', type: 'varchar', length: 255, nullable: false })
  city: string;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  address: string;

  @Column({ name: 'floor', type: 'varchar', length: 20 })
  floor: string | null;

  @Column({ name: 'room', type: 'varchar', length: 20 })
  room: string | null;

  @Column({
    name: 'latitude',
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: false,
  })
  latitude: number;

  @Column({
    name: 'longitude',
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: false,
  })
  longitude: number;

  @OneToMany(() => FireSensorDao, (fireSensor) => fireSensor.location)
  fireSensors: FireSensorDao[];

  @ManyToMany(() => UserDao, (user) => user.locations)
  users: UserDao[];
}
