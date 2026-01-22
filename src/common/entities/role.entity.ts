import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

export class RoleEntity extends BaseEntity {
  name: string;
  description: string;
  users?: UserEntity[];
}
