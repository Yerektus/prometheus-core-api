import { HttpStatus, Injectable } from '@nestjs/common';
import { LocationsRepository } from '../data/locations.repository';
import { CreateLocationBody } from '../presenter/bodies/create-location.body';
import { UserEntity } from 'src/common/entities/user.entity';
import { LocationEntity } from 'src/common/entities/location.entity';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';

@Injectable()
export class LocationsService {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  async createLocation(
    payload: CreateLocationBody,
    user: UserEntity,
  ): Promise<LocationEntity> {
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
}
