import { HttpStatus, Injectable } from '@nestjs/common';
import { LocationsRepository } from '../data/locations.repository';
import { LocationEntity } from 'src/common/entities/location.entity';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { CreateLocationAndFireSensorDto } from '../dto/create-location-and-fire-sensor.dto';
import { UsersRepository } from 'src/modules/users/data/users.repository';

@Injectable()
export class LocationsService {
  constructor(
    private readonly locationsRepository: LocationsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createLocation(payload: CreateLocationDto): Promise<LocationEntity> {
    const savedLocation =
      await this.locationsRepository.insertAndGetLocation(payload);

    if (!savedLocation) {
      throw buildHttpError(ErrorCode.OwnerNotFound, HttpStatus.BAD_REQUEST);
    }

    return savedLocation;
  }

  async createFireSensorAndLocation(
    userId: string,
    payload: CreateLocationAndFireSensorDto,
  ): Promise<LocationEntity> {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw buildHttpError(ErrorCode.UserNotFound, HttpStatus.NOT_FOUND);
    }

    const location =
      await this.locationsRepository.insertAndGetLocationAndFireSensor(
        userId,
        payload,
      );

    if (!location) {
      throw buildHttpError(
        ErrorCode.InternalServerError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    console.log(location);

    return location;
  }

  async getLocationById(locationId: string): Promise<LocationEntity> {
    const location = await this.locationsRepository.getLocationById(locationId);

    if (!location) {
      throw buildHttpError(ErrorCode.LocationNotFound, HttpStatus.NOT_FOUND);
    }

    return location;
  }

  getLocations(): Promise<LocationEntity[]> {
    return this.locationsRepository.getLocations();
  }

  getLocationsByUserId(userId: string): Promise<LocationEntity[]> {
    return this.locationsRepository.getLocationsByUserId(userId);
  }

  async updateLocationById(
    locationId: string,
    payload: UpdateLocationDto,
  ): Promise<LocationEntity> {
    const location = await this.locationsRepository.getLocationById(locationId);

    if (!location) {
      throw buildHttpError(ErrorCode.LocationNotFound, HttpStatus.NOT_FOUND);
    }

    const updatedLocation = await this.locationsRepository.updateLocationById(
      locationId,
      payload,
    );

    if (!updatedLocation) {
      throw buildHttpError(
        ErrorCode.InternalServerError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return updatedLocation;
  }

  async removeLocationById(locationId: string): Promise<void> {
    await this.locationsRepository.removeLocationById(locationId);
  }
}
