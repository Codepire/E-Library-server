import { IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  book_name: string;
}
