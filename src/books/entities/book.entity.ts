import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  book_name: string;

  @Column()
  book_description: string;

  @Column()
  book_author: string;

  @Column()
  book_profile: string;

  @Column()
  book_pdf: string;
}
