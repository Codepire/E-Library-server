import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        MulterModule.register({
            storage: diskStorage({
                destination: (req, file, callback) => {
                    if (file.mimetype.startsWith('image/')) {
                        callback(null, './uploads/profiles/');
                    } else if (file.mimetype.match('application/pdf')) {
                        callback(null, './uploads/pdfs/');
                    }
                },
                filename(
                    req: e.Request,
                    file: Express.Multer.File,
                    callback: (error: Error | null, filename: string) => void,
                ) {
                    callback(null, file.originalname);
                },
            }),
            fileFilter(
                req: any,
                file: {
                    fieldname: string;
                    originalname: string;
                    encoding: string;
                    mimetype: string;
                    size: number;
                    destination: string;
                    filename: string;
                    path: string;
                    buffer: Buffer;
                },
                callback: (error: Error | null, acceptFile: boolean) => void,
            ) {
                if (
                    file.mimetype.startsWith('image/') ||
                    file.mimetype.match('application/pdf')
                ) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            },
        }),
    ],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
