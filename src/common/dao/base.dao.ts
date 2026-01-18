import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseDao {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date | null;
}
