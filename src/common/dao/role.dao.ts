import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseDao } from './base.dao';
import { UserDao } from './user.dao';

@Entity({ name: 'roles' })
export class RoleDao extends BaseDao {
  @Column({ name: 'name', type: 'varchar', length: 32, unique: true })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => UserDao, (user) => user.roles)
  users: UserDao[];
}
