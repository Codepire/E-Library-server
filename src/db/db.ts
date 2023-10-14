import { Book } from 'src/books/entities/book.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();
export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  url: process.env.DATABASE_URL,
  port: +process.env.DATABASE_PORT,
  ssl: true,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [Book],
  migrations: ['./dist/migrations/*.js'],
};

export const dataSource: DataSource = new DataSource(AppDataSourceOptions);
dataSource.initialize();
