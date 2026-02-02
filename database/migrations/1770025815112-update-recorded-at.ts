import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRecordedAt1770025815112 implements MigrationInterface {
  name = 'UpdateRecordedAt1770025815112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor_readings" DROP COLUMN "recorded_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_readings" ADD "recorded_at" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor_readings" DROP COLUMN "recorded_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_readings" ADD "recorded_at" TIME WITH TIME ZONE NOT NULL`,
    );
  }
}
