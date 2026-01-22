import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProject1769012952883 implements MigrationInterface {
  name = 'InitProject1769012952883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_access_tokens" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "token" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_f07c49baf74e5d699c83e2ec2bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sensor_readings" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "temperature_c" numeric(5,2) NOT NULL, "humidity_pct" numeric(5,2) NOT NULL, "gas_ppm" numeric(8,2) NOT NULL, "recorded_at" TIME WITH TIME ZONE NOT NULL, "fire_sensor_id" uuid NOT NULL, CONSTRAINT "PK_ae97fcc8df9e5662d9d007d102b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fire_sensors" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "serial_number" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "installed_at" TIMESTAMP WITH TIME ZONE NOT NULL, "locationId" uuid, CONSTRAINT "PK_0072140b25e5cf44091aae1f5e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "country" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "street" character varying(255) NOT NULL, "floor" character varying(20) NOT NULL, "room" character varying(20) NOT NULL, "latitude" numeric(9,6) NOT NULL, "longitude" numeric(9,6) NOT NULL, CONSTRAINT "UQ_a1d8353c5489209e0509927e29d" UNIQUE ("street"), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "username" character varying(50) NOT NULL, "role" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "phone_numbers" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_locations" ("usersId" uuid NOT NULL, "locationsId" uuid NOT NULL, CONSTRAINT "PK_cbca879085d9c49a9dc98b2f301" PRIMARY KEY ("usersId", "locationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_753709c9d8c314f3aed7dc5169" ON "user_locations" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c88885a479bb9c8ab4445e7eb" ON "user_locations" ("locationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_access_tokens" ADD CONSTRAINT "FK_e9d9d0c303432e4e5e48c1c3e90" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_readings" ADD CONSTRAINT "FK_1ab4e5f5be164a5f05e700a3ae5" FOREIGN KEY ("fire_sensor_id") REFERENCES "fire_sensors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fire_sensors" ADD CONSTRAINT "FK_061480ba0077730ccdedf5da310" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "FK_753709c9d8c314f3aed7dc5169a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "FK_6c88885a479bb9c8ab4445e7ebd" FOREIGN KEY ("locationsId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "FK_6c88885a479bb9c8ab4445e7ebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "FK_753709c9d8c314f3aed7dc5169a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fire_sensors" DROP CONSTRAINT "FK_061480ba0077730ccdedf5da310"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor_readings" DROP CONSTRAINT "FK_1ab4e5f5be164a5f05e700a3ae5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_access_tokens" DROP CONSTRAINT "FK_e9d9d0c303432e4e5e48c1c3e90"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6c88885a479bb9c8ab4445e7eb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_753709c9d8c314f3aed7dc5169"`,
    );
    await queryRunner.query(`DROP TABLE "user_locations"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "fire_sensors"`);
    await queryRunner.query(`DROP TABLE "sensor_readings"`);
    await queryRunner.query(`DROP TABLE "user_access_tokens"`);
  }
}
