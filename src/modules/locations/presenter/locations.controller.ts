import { Body, Controller, Post } from '@nestjs/common';
import { LocationsService } from '../domain/locations.service';
import { CreateLocationBody } from './bodies/create-location.body';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { Authorized } from 'src/modules/auth/decorators/authorized.decorator';
import { UserEntity } from 'src/common/entities/user.entity';
import { LocationResource } from './resources/locations.resource';

@Controller('/v1/locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly locationResource: LocationResource,
  ) {}

  @Authorization('ADMIN')
  @Post('/')
  async createLocation(
    @Authorized() user: UserEntity,
    @Body() body: CreateLocationBody,
  ) {
    const location = await this.locationsService.createLocation(body, user);

    return {
      data: this.locationResource.convert(location),
    };
  }
}
