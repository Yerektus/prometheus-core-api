import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLocationsAndFireSensorsTables1769671631526 implements MigrationInterface {
  name = 'UpdateLocationsAndFireSensorsTables1769671631526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fire_sensors" ALTER COLUMN "installed_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "UQ_a1d8353c5489209e0509927e29d"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "UQ_a1d8353c5489209e0509927e29d" UNIQUE ("street")`,
    );
    await queryRunner.query(
      `ALTER TABLE "fire_sensors" ALTER COLUMN "installed_at" SET NOT NULL`,
    );
  }
}
