import {
  Entity,
  Column,
  Index,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseDao } from './base.dao';
import { UserAccessTokenDao } from './user-access-token.dao';
import { LocationDao } from './location.dao';

@Entity({ name: 'users' })
@Index(['email'])
@Index(['username'])
export class UserDao extends BaseDao {
  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({ name: 'role', type: 'varchar', length: 50, nullable: false })
  role: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({
    name: 'phone_numbers',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  phoneNumbers: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @OneToMany(
    () => UserAccessTokenDao,
    (userAccessToken) => userAccessToken.user,
  )
  accessTokens: UserAccessTokenDao[];

  @ManyToMany(() => LocationDao, (location) => location.users)
  @JoinTable({ name: 'user_locations' })
  locations: LocationDao[];
}
