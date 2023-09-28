import { Book } from 'src/books/entities/book.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'codepire',
  password: 'codepire@009',
  database: 'e-library',
  entities: [Book],
  synchronize: true,
};

new DataSource(AppDataSourceOptions).initialize();
