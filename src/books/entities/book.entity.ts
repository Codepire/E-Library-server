import { Faculty } from 'src/users/entities/faculty.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    // @ManyToOne(() => Faculty, (faculty) => faculty.created_books)
    // created_by: Faculty

    // @Column({ default: Date.now(), type: 'timestamp' })
    // created_at: string

    // @ManyToOne(() => Faculty, (faculty) => faculty.updated_books)
    // updated_by?: Faculty

    // @Column({ nullable: true, type: 'timestamp' })
    // updated_at?: string

    // @Column({ default: false })
    // is_deleted?: boolean
}
