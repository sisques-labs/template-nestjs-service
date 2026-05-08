import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: (process.env.DATABASE_DRIVER ?? 'postgres') as 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number.parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  database: process.env.DATABASE_DATABASE ?? 'your-service-name',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: process.env.DATABASE_MIGRATIONS_TABLE_NAME ?? 'migrations',
  synchronize: false,
});
