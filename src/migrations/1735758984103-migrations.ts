import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735758984103 implements MigrationInterface {
  name = "Migrations1735758984103";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "results" ADD "attempt" integer NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "attempt"`);
  }
}
