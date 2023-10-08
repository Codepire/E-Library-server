import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { apiResponse } from '../common/interfaces/apiResponse.interface';
import { FindBooksDto } from './dto/find-books.dto';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async uploadBook(
    createBookDto: CreateBookDto,
    files: { book_profile: Express.Multer.File; book_pdf: Express.Multer.File },
  ): Promise<apiResponse> {
    const queryBuilder = this.booksRepository.createQueryBuilder('book');
    const { book_name, book_description, book_author } = createBookDto;
    const existingBook: Book = await queryBuilder
      .where('book.book_name = :book_name', { book_name })
      .getOne();

    if (existingBook) {
      throw new HttpException(
        'Book already exist with this title.',
        HttpStatus.CONFLICT,
      );
    }

    const newBook: Book = {
      book_name: book_name,
      book_description: book_description,
      book_author: book_author,
      book_pdf: files.book_pdf[0].destination + files.book_pdf[0].originalname,
      book_profile:
        files.book_profile[0].destination + files.book_profile[0].originalname,
    };
    await queryBuilder.insert().into('book').values(newBook).execute();

    return {
      response: 'Book uploaded',
      statusCode: HttpStatus.CREATED,
    };
  }

  async findBooks(filters: FindBooksDto): Promise<apiResponse> {
    const queryBuilder = this.booksRepository.createQueryBuilder('book');

    try {
      queryBuilder.offset(filters.offset);
      queryBuilder.limit(filters.limit);

      for (const search in filters.searchBy) {
        queryBuilder.andWhere(`book.${search} = :${search}`, {
          [search]: filters.searchBy[search],
        });
      }

      for (const order in filters.orderBy) {
        queryBuilder.orderBy(`book.${order}`, filters.orderBy[order]);
      }
    } catch (err) {
      throw new HttpException(
        'Make sure you have send right filters',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const [foundBooks, count] = await queryBuilder.getManyAndCount();
    return {
      response: 'Listed all books',
      statusCode: HttpStatus.OK,
      data: {
        books: foundBooks,
        count: count,
      },
    };
  }

  async findOneById(id: number): Promise<apiResponse> {
    const foundBook: Book = await this.booksRepository.findOneBy({ id });
    if (!foundBook) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      response: 'Book found.',
      data: {
        book: foundBook,
      },
    };
  }

  async getFile(path: string, res: Response) {
    const filePath = path.slice(10);
    const root = path.slice(0, 9);
    res.sendFile(filePath, { root });
  }

  async updateBookById(
    id: number,
    updateBookDto: UpdateBookDto,
    files: { book_profile: Express.Multer.File; book_pdf: Express.Multer.File },
  ): Promise<apiResponse> {
    const queryBuilder = this.booksRepository.createQueryBuilder('book');
    const { book_profile, book_pdf } = files;
    const foundBook: Book = await queryBuilder
      .where('book.id = :id', { id })
      .getOne();

    if (!foundBook) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    for (const update in updateBookDto) {
      queryBuilder
        .update()
        .set({ [update]: updateBookDto[update] })
        .where('book.id = :id', { id: id })
        .execute();
    }

    if (
      book_profile &&
      files.book_profile[0].destination + files.book_profile[0].originalname !==
        foundBook.book_profile
    ) {
      fs.unlink(foundBook.book_profile, () => {
        foundBook.book_profile =
          book_profile[0].destination + book_profile[0].originalname;
      });
    }

    if (
      book_pdf &&
      book_pdf[0].destination + book_pdf[0].originalname !== foundBook.book_pdf
    ) {
      fs.unlink(foundBook.book_pdf, () => {
        foundBook.book_pdf = book_pdf[0].destination + book_pdf[0].originalname;
      });
    }

    this.booksRepository.save(foundBook);
    return {
      statusCode: HttpStatus.CREATED,
      response: 'Book updated.',
    };
  }

  async removeBookById(id: number): Promise<apiResponse> {
    const foundBook: Book = await this.booksRepository.findOneBy({ id });
    if (!foundBook) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    fs.unlink(foundBook.book_profile, (err) =>
      err ? console.error(err) : null,
    );
    fs.unlink(foundBook.book_pdf, (err) => (err ? console.error(err) : null));
    this.booksRepository.delete({ id: foundBook.id });
    return {
      response: 'Book deleted successfully.',
      statusCode: HttpStatus.GONE,
    };
  }
}
