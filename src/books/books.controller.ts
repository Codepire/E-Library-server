import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Put,
  Query,
  Res,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FindBooksDto } from './dto/find-books.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Controller('books')
@UseGuards(
  new AuthGuard(new JwtService(), new Reflector(), new ConfigService()),
)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @SetMetadata('roles', ['admin'])
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'book_profile', maxCount: 1 },
      { name: 'book_pdf', maxCount: 1 },
    ]),
  )
  uploadBook(
    @UploadedFiles()
    files: { book_profile: Express.Multer.File; book_pdf: Express.Multer.File },
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.booksService.uploadBook(createBookDto, files);
  }

  @Post('filter')
  @SetMetadata('roles', ['admin', 'student'])
  findBooks(@Body() filters: FindBooksDto) {
    return this.booksService.findBooks(filters);
  }

  @Get('get-file')
  @SetMetadata('roles', ['admin', 'student'])
  getFile(@Query('path') path: string, @Res() res: Response) {
    return this.booksService.getFile(path, res);
  }

  @Get(':id')
  @SetMetadata('roles', ['admin', 'student'])
  findOneById(@Param('id') id: string) {
    return this.booksService.findOneById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['admin'])
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'book_profile', maxCount: 1 },
      { name: 'book_pdf', maxCount: 1 },
    ]),
  )
  updateBookById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFiles()
    files: { book_profile: Express.Multer.File; book_pdf: Express.Multer.File },
  ) {
    return this.booksService.updateBookById(+id, updateBookDto, files);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin'])
  removeBookById(@Param('id') id: string) {
    return this.booksService.removeBookById(+id);
  }
}
