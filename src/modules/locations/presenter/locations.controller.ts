import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationsService } from '../domain/locations.service';
import { CreateLocationBody } from './bodies/create-location.body';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { LocationResource } from './resources/locations.resource';
import { GetLocationIdParam } from './params/get-location-id.param';
import { GetUserIdParam } from './params/get-user-id.param';
import { UpdateLocationBody } from './bodies/update-location.body';

@Controller('/v1/locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly locationResource: LocationResource,
  ) {}

  @Authorization('ADMIN')
  @Post('/')
  async createLocation(@Body() body: CreateLocationBody) {
    const location = await this.locationsService.createLocation(body);

    return {
      data: this.locationResource.convert(location),
    };
  }

  @Authorization('USER')
  @Get(':location_id')
  async getLocationById(@Param() param: GetLocationIdParam) {
    const location = await this.locationsService.getLocationById(
      param.location_id,
    );

    return {
      data: this.locationResource.convert(location),
    };
  }

  @Authorization('USER')
  @Get('/')
  async getLocations() {
    const locations = await this.locationsService.getLocations();

    return {
      data: locations.map((location) =>
        this.locationResource.convert(location),
      ),
    };
  }

  @Authorization('USER')
  @Get('/user/:user_id')
  async getLocationsByUserId(@Param() param: GetUserIdParam) {
    const locations = await this.locationsService.getLocationsByUserId(
      param.user_id,
    );

    return {
      data: locations.map((location) =>
        this.locationResource.convert(location),
      ),
    };
  }

  @Authorization('USER')
  @Patch('/:location_id')
  async updateLocationById(
    @Param() param: GetLocationIdParam,
    @Body() body: UpdateLocationBody,
  ) {
    const location = await this.locationsService.updateLocationById(
      param.location_id,
      body,
    );

    return {
      data: this.locationResource.convert(location),
    };
  }

  @Authorization('USER')
  @Delete(':location_id')
  async deleteLocationById(@Param() param: GetLocationIdParam) {
    await this.locationsService.removeLocationById(param.location_id);
  }
}
