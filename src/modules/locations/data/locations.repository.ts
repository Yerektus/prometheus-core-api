import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDao } from 'src/common/dao/location.dao';
import { DataSource, Repository } from 'typeorm';
import { CreateLocationBody } from '../presenter/bodies/create-location.body';
import { LocationEntity } from 'src/common/entities/location.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from 'src/modules/users/data/users.repository';
import { UserDao } from 'src/common/dao/user.dao';

@Injectable()
export class LocationsRepository {
  constructor(
    @InjectRepository(LocationDao)
    private readonly locationsRepositry: Repository<LocationDao>,
    private readonly usersRepository: UsersRepository,
    private readonly dataSource: DataSource,
  ) {}

  insertAndGetLocation(
    payload: CreateLocationBody,
  ): Promise<LocationEntity | null> {
    return this.dataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(UserDao);
      const existUser = await this.usersRepository.getUserById(
        payload.owner_id,
      );
      if (!existUser) {
        return null;
      }

      const location = await this.locationsRepositry.save({
        id: uuidv4(),
        country: payload.country,
        city: payload.city,
        address: payload.address,
        floor: payload.floor,
        room: payload.room,
        latitude: 0, //todo(yerektus): auto generate latitude
        longitude: 0, //todo(yerektus): auto generate longitude
      });

      await userRepo
        .createQueryBuilder()
        .relation(UserDao, 'locations')
        .of(payload.owner_id)
        .add(location.id);

      return location;
    });
  }

  async getLocationByAddress(address: string) {
    return this.locationsRepositry.findOne({
      where: {
        address: address,
      },
    });
  }
}
