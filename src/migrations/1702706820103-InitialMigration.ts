import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1702706820103 implements MigrationInterface {
    name = 'InitialMigration1702706820103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "book_name" character varying NOT NULL, "book_description" character varying NOT NULL, "book_author" character varying NOT NULL, "book_profile" character varying NOT NULL, "book_pdf" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
