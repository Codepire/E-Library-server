import { Book } from 'src/books/entities/book.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();
export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'e-library',
  entities: [Book],
  migrations: ['./dist/migrations/*.js'],
};

export const dataSource: DataSource = new DataSource(AppDataSourceOptions);
dataSource.initialize();
