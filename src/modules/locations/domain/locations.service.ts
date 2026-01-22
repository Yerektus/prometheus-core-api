import { HttpStatus, Injectable } from '@nestjs/common';
import { LocationsRepository } from '../data/locations.repository';
import { CreateLocationBody } from '../presenter/bodies/create-location.body';
import { LocationEntity } from 'src/common/entities/location.entity';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { UpdateLocationBody } from '../presenter/bodies/update-location.body';

@Injectable()
export class LocationsService {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  async createLocation(payload: CreateLocationBody): Promise<LocationEntity> {
    const location = await this.locationsRepository.getLocationByAddress(
      payload.address,
    );

    if (location) {
      throw buildHttpError(
        ErrorCode.LocationAlreadyExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedLocation =
      await this.locationsRepository.insertAndGetLocation(payload);

    if (!savedLocation) {
      throw buildHttpError(ErrorCode.OwnerNotFound, HttpStatus.BAD_REQUEST);
    }

    return savedLocation;
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
    payload: UpdateLocationBody,
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
