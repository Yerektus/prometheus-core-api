import { Injectable } from '@nestjs/common';
import { UserDao } from 'src/common/dao/user.dao';

@Injectable()
export class UserResource {
  convert(payload: UserDao) {
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
