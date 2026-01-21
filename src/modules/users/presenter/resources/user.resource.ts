import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class UserResource {
  convert(payload: UserEntity) {
    return {
      id: payload.id,
      role: payload.role,
      username: payload.username,
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone_numbers: payload.phoneNumbers,
    };
  }
}
