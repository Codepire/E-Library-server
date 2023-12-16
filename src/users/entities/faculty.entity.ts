import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';

@Entity()
export class Faculty {
    @PrimaryColumn()
    username: string;

    // @OneToMany(() => Book, (book) => book.created_by)
    // created_books: string;

    // @OneToMany(() => Book, (book) => book.updated_by)
    // updated_books: string;
}
