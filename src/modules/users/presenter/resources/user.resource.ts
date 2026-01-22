import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/entities/user.entity';
import { RoleRosource } from 'src/modules/roles/presenter/resources/role.resoucre';

@Injectable()
export class UserResource {
  constructor(private readonly roleResource: RoleRosource) {}

  convert(payload: UserEntity) {
    return {
      id: payload.id,
      username: payload.username,
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone_numbers: payload.phoneNumbers,
      roles: payload.roles?.map((role) => this.roleResource.convert(role)),
    };
  }
}
