import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

export class UserAccessTokenEntity extends BaseEntity {
  token: string;
  userId: string;
  user: UserEntity;
}
