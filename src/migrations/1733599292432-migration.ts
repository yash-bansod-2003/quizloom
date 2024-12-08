import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733599292432 implements MigrationInterface {
  name = "Migration1733599292432";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_verified" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_verified"`);
  }
}
