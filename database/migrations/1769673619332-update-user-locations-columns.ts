import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserLocationsColumns1769673619332 implements MigrationInterface {
  name = 'UpdateUserLocationsColumns1769673619332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "FK_753709c9d8c314f3aed7dc5169a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "FK_6c88885a479bb9c8ab4445e7ebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_753709c9d8c314f3aed7dc5169"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6c88885a479bb9c8ab4445e7eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "PK_cbca879085d9c49a9dc98b2f301"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "PK_6c88885a479bb9c8ab4445e7ebd" PRIMARY KEY ("locationsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP COLUMN "usersId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "PK_6c88885a479bb9c8ab4445e7ebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP COLUMN "locationsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "PK_437edca703095b237b5bdb35e22" PRIMARY KEY ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD "location_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "PK_437edca703095b237b5bdb35e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "PK_aac5bef9251764c6f9efc0bab40" PRIMARY KEY ("user_id", "location_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_437edca703095b237b5bdb35e2" ON "user_locations" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f495c9a559977dbbc1901a143" ON "user_locations" ("location_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "FK_437edca703095b237b5bdb35e22" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "FK_3f495c9a559977dbbc1901a143e" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "FK_3f495c9a559977dbbc1901a143e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "FK_437edca703095b237b5bdb35e22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f495c9a559977dbbc1901a143"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_437edca703095b237b5bdb35e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "PK_aac5bef9251764c6f9efc0bab40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "PK_437edca703095b237b5bdb35e22" PRIMARY KEY ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP COLUMN "location_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "PK_437edca703095b237b5bdb35e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD "locationsId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "PK_6c88885a479bb9c8ab4445e7ebd" PRIMARY KEY ("locationsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD "usersId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" DROP CONSTRAINT "PK_6c88885a479bb9c8ab4445e7ebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "PK_cbca879085d9c49a9dc98b2f301" PRIMARY KEY ("usersId", "locationsId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c88885a479bb9c8ab4445e7eb" ON "user_locations" ("locationsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_753709c9d8c314f3aed7dc5169" ON "user_locations" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "FK_6c88885a479bb9c8ab4445e7ebd" FOREIGN KEY ("locationsId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_locations" ADD CONSTRAINT "FK_753709c9d8c314f3aed7dc5169a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
