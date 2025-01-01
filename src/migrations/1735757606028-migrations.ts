import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735757606028 implements MigrationInterface {
  name = "Migrations1735757606028";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "submissions" ADD "attempt" integer NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "attempt"`);
  }
}
