import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDao } from 'src/common/dao/location.dao';
import { DataSource, Repository } from 'typeorm';
import { LocationEntity } from 'src/common/entities/location.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from 'src/modules/users/data/users.repository';
import { UserDao } from 'src/common/dao/user.dao';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationsRepository {
  constructor(
    @InjectRepository(LocationDao)
    private readonly locationsRepositry: Repository<LocationDao>,
    private readonly usersRepository: UsersRepository,
    private readonly dataSource: DataSource,
  ) {}

  insertAndGetLocation(
    payload: CreateLocationDto,
  ): Promise<LocationEntity | null> {
    return this.dataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(UserDao);
      const existUser = await this.usersRepository.getUserById(
        payload.owner_id,
      );
      if (!existUser) {
        return null;
      }

      let location = await this.locationsRepositry.findOne({
        where: {
          country: payload.country,
          city: payload.city,
          address: payload.address,
          floor: payload.floor,
          flat: payload.flat,
        },
      });

      if (!location) {
        location = await this.locationsRepositry.save({
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
        .values({ user_id: payload.owner_id, location_id: location.id })
        .orIgnore()
        .execute();

      return location;
    });
  }

  getLocationByAddress(address: string): Promise<LocationEntity | null> {
    return this.locationsRepositry.findOne({
      where: {
        address: address,
      },
    });
  }

  getLocationById(locationId: string): Promise<LocationEntity | null> {
    return this.locationsRepositry.findOne({
      where: {
        id: locationId,
      },
    });
  }

  getLocations(): Promise<LocationEntity[]> {
    return this.locationsRepositry.find({
      relations: {
        fireSensors: true,
      },
    });
  }

  getLocationsByUserId(userId: string): Promise<LocationEntity[]> {
    return this.locationsRepositry.find({
      where: {
        users: {
          id: userId,
        },
      },
    });
  }

  async updateLocationById(
    locationId: string,
    payload: UpdateLocationDto,
  ): Promise<LocationEntity | null> {
    await this.locationsRepositry.update(
      { id: locationId },
      {
        country: payload.country,
        city: payload.city,
        address: payload.address,
        floor: payload.floor,
        flat: payload.flat,
      },
    );

    return this.locationsRepositry.findOne({
      where: { id: locationId },
    });
  }

  async removeLocationById(locationdId: string): Promise<void> {
    await this.locationsRepositry.softDelete(locationdId);
  }
}
