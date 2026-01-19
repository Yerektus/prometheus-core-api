import { BaseEntity } from './base.entity';
import { UserAccessTokenEntity } from './user-access-token.entity';

export class UserEntity extends BaseEntity {
  username: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumbers: string;
  password: string;
  accessTokens: UserAccessTokenEntity[];
}
