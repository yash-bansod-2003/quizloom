import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733597297367 implements MigrationInterface {
  name = "Migration1733597297367";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "text"`);
    await queryRunner.query(`ALTER TABLE "answers" ADD "text" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "text"`);
    await queryRunner.query(`ALTER TABLE "questions" ADD "text" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "questions" ADD "type" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "firstName" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "lastName" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "email" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "password" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" text NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "questions" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "text"`);
    await queryRunner.query(
      `ALTER TABLE "questions" ADD "text" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "text"`);
    await queryRunner.query(
      `ALTER TABLE "answers" ADD "text" character varying NOT NULL`,
    );
  }
}
