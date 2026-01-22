import { BaseEntity } from './base.entity';
import { LocationEntity } from './location.entity';
import { RoleEntity } from './role.entity';
import { UserAccessTokenEntity } from './user-access-token.entity';

export class UserEntity extends BaseEntity {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumbers: string;
  password: string;
  accessTokens?: UserAccessTokenEntity[];
  locations?: LocationEntity[];
  roles?: RoleEntity[];
}
