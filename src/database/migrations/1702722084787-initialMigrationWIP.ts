import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigrationWIP1702722084787 implements MigrationInterface {
  name = 'InitialMigrationWIP1702722084787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("username" character varying NOT NULL, "password" character varying NOT NULL, "roleRole" character varying, CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "book_name" character varying NOT NULL, "book_description" character varying NOT NULL, "book_author" character varying NOT NULL, "book_profile" character varying NOT NULL, "book_pdf" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "faculty" ("username" character varying NOT NULL, CONSTRAINT "PK_afca0c8bed1a37c30c3290e47fe" PRIMARY KEY ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "student" ("username" character varying NOT NULL, "semester" integer NOT NULL, CONSTRAINT "PK_cdf9742519b09580df0bc13cb18" PRIMARY KEY ("username"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_a941abab6d14ecf1ee8154d1c9e" FOREIGN KEY ("roleRole") REFERENCES "roles_master"("role") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_a941abab6d14ecf1ee8154d1c9e"`,
    );
    await queryRunner.query(`DROP TABLE "student"`);
    await queryRunner.query(`DROP TABLE "faculty"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
