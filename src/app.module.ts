import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from './db/db';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSourceOptions), BooksModule],
})
export class AppModule {}
