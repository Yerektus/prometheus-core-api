import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/common/dao/*.dao.ts'],
  migrations: ['database/migrations/*.ts'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
