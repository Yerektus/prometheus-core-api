import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDao } from './base.dao';
import { UserDao } from './user.dao';

@Entity('user_access_tokens')
export class UserAccessTokenDao extends BaseDao {
  @Column({ name: 'token', type: 'text' })
  token: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserDao, (user) => user.accessTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserDao;
}
