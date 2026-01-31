import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameRoomToFlat1769853980206 implements MigrationInterface {
  name = 'RenameRoomToFlat1769853980206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" RENAME COLUMN "room" TO "flat"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" RENAME COLUMN "flat" TO "room"`,
    );
  }
}
