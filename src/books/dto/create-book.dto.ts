import { IsString } from 'class-validator';

export class CreateBookDto {
    @IsString()
    book_name: string;

    @IsString()
    book_description: string;

    @IsString()
    book_author: string;
}
