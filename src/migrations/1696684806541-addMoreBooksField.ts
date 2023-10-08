import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMoreBooksField1696684806541 implements MigrationInterface {
  name = 'AddMoreBooksField1696684806541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "book_description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "book_author" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "book_profile" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "book_pdf" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "book_pdf"`);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "book_profile"`);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "book_author"`);
    await queryRunner.query(
      `ALTER TABLE "book" DROP COLUMN "book_description"`,
    );
  }
}
