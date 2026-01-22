import { LocationEntity } from 'src/common/entities/location.entity';

export class LocationResource {
  convert(location: LocationEntity) {
    return {
      id: location.id,
      country: location.country,
      city: location.city,
      address: location.address,
      floor: location.floor,
      room: location.room,
    };
  }
}
