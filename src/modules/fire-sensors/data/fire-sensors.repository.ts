import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FireSensorDao } from 'src/common/dao/fire-sensor.dao';
import { FireSensorEntity } from 'src/common/entities/fire-sensor.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateLocationAndFireSensorDto } from '../dto/create-location-and-fire-sensor.dto';
import { LocationDao } from 'src/common/dao/location.dao';
import { UserDao } from 'src/common/dao/user.dao';
import { v4 as uuidv4 } from 'uuid';
import { UpdateLocationAndFireSensorDto } from '../dto/update-location-and-fire-sensor';

@Injectable()
export class FireSensorsRepository {
  constructor(
    @InjectRepository(FireSensorDao)
    private readonly fireSensorsRepository: Repository<FireSensorDao>,
    private readonly dataSource: DataSource,
  ) {}

  insertAndGetLocationAndFireSensor(
    payload: CreateLocationAndFireSensorDto,
  ): Promise<FireSensorEntity | null> {
    return this.dataSource.transaction(async (manager) => {
      const fireSensorsRepo = manager.getRepository(FireSensorDao);
      const locationsRepo = manager.getRepository(LocationDao);
      const userRepo = manager.getRepository(UserDao);

      const existUser = await userRepo.findOne({
        where: {
          id: payload.ownerId,
        },
      });

      if (!existUser) {
        return null;
      }

      let location = await locationsRepo.findOne({
        where: {
          country: payload.country,
          city: payload.city,
          address: payload.address,
          floor: payload.floor,
          flat: payload.flat,
        },
      });

      if (!location) {
        location = await locationsRepo.save({
          id: uuidv4(),
          country: payload.country,
          city: payload.city,
          address: payload.address,
          floor: payload.floor,
          flat: payload.flat,
          latitude: 0, //todo(yerektus): auto generate latitude
          longitude: 0, //todo(yerektus): auto generate longitude
        });
      }

      await userRepo
        .createQueryBuilder()
        .insert()
        .into('user_locations')
        .values({ user_id: payload.ownerId, location_id: location.id })
        .orIgnore()
        .execute();

      const savedFireSensor = await fireSensorsRepo.save({
        id: uuidv4(),
        serialNumber: payload.serialNumber,
        model: payload.model,
        location: {
          id: location.id,
        },
      });

      const fireSensor = await fireSensorsRepo.findOne({
        where: {
          id: savedFireSensor.id,
        },
        relations: {
          location: {
            users: true,
          },
        },
      });

      return fireSensor;
    });
  }

  updateLocationAndFireSensor(
    fireSensorId: string,
    payload: UpdateLocationAndFireSensorDto,
  ): Promise<FireSensorEntity | null> {
    return this.dataSource.transaction(async (manager) => {
      const fireSensorsRepo = manager.getRepository(FireSensorDao);
      const locationsRepo = manager.getRepository(LocationDao);
      const userRepo = manager.getRepository(UserDao);

      const user = await userRepo.findOne({
        where: {
          id: payload.ownerId,
        },
      });

      if (!user) {
        return null;
      }

      const location = await locationsRepo.update(
        {
          id: payload.locationId,
        },
        {
          country: payload.country,
          city: payload.city,
          address: payload.address,
          floor: payload.floor,
          flat: payload.flat,
        },
      );

      if (!location.affected) {
        return null;
      }

      await fireSensorsRepo.update(
        {
          id: fireSensorId,
        },
        {
          serialNumber: payload.serialNumber,
          model: payload.model,
        },
      );

      const updatedFireSensor = await fireSensorsRepo.findOne({
        where: {
          id: fireSensorId,
        },
        relations: {
          location: {
            users: true,
          },
        },
      });

      if (!updatedFireSensor) {
        return null;
      }

      return updatedFireSensor;
    });
  }

  getFireSensors(): Promise<FireSensorEntity[]> {
    return this.fireSensorsRepository.find({
      relations: {
        location: {
          users: true,
        },
      },
    });
  }

  getFireSensorById(fireSensorId: string): Promise<FireSensorEntity | null> {
    return this.fireSensorsRepository.findOne({
      where: {
        id: fireSensorId,
      },
    });
  }
}
