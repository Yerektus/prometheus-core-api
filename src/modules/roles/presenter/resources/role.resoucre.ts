import { Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/common/entities/role.entity';

@Injectable()
export class RoleRosource {
  convert(payload: RoleEntity) {
    return {
      id: payload.id,
      name: payload.name,
      description: payload.description,
    };
  }
}
