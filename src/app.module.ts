import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from './db/db';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
