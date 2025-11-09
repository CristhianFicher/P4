import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1710000000000 implements MigrationInterface {
    name = 'InitSchema1710000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "team_members" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "name" varchar(120) NOT NULL,
          "role" varchar(20) NOT NULL,
          "phone" varchar(20) NOT NULL,
          "email" varchar(160) NOT NULL UNIQUE,
          "active" boolean NOT NULL DEFAULT true,
          "expertiseLevel" varchar(20) NOT NULL,
          "certificationExpiry" date NOT NULL,
          "hiredAt" date NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );`);

        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_team_members_name" ON "team_members" ("name");`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "clients" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "name" varchar(120) NOT NULL,
          "phone" varchar(20) NOT NULL,
          "email" varchar(160) NOT NULL UNIQUE,
          "vehicle" varchar(120) NOT NULL,
          "licensePlate" varchar(10) NOT NULL,
          "lastVisit" date NOT NULL,
          "tier" varchar(10) NOT NULL,
          "preferredAdvisor" uuid NULL,
          "active" boolean NOT NULL DEFAULT true,
          "notes" text NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_clients_name" ON "clients" ("name");`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "suppliers" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "company" varchar(120) NOT NULL,
          "contactName" varchar(120) NOT NULL,
          "phone" varchar(20) NOT NULL,
          "email" varchar(160) NOT NULL UNIQUE,
          "category" varchar(30) NOT NULL,
          "leadTimeDays" integer NOT NULL,
          "preferred" boolean NOT NULL,
          "rating" numeric(3,1) NOT NULL,
          "lastOrderDate" date NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_suppliers_company" ON "suppliers" ("company");`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "parts" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "name" varchar(120) NOT NULL,
          "code" varchar(40) NOT NULL UNIQUE,
          "quantity" integer NOT NULL,
          "minStock" integer NOT NULL,
          "location" varchar(80) NOT NULL,
          "supplier" varchar(80) NOT NULL,
          "category" varchar(20) NOT NULL,
          "unitCost" numeric(10,2) NOT NULL,
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_parts_name" ON "parts" ("name");`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "revisions" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "clientName" varchar(120) NOT NULL,
          "clientPhone" varchar(20) NOT NULL,
          "vehicleModel" varchar(120) NOT NULL,
          "licensePlate" varchar(10) NOT NULL,
          "serviceDescription" text NOT NULL,
          "scheduledDate" TIMESTAMP WITH TIME ZONE NOT NULL,
          "scheduledTime" varchar(5) NOT NULL,
          "status" varchar(20) NOT NULL,
          "priority" varchar(10) NOT NULL,
          "assignedTo" uuid NULL,
          "notes" text NULL,
          "remindersEnabled" boolean NOT NULL DEFAULT false,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_revisions_date" ON "revisions" ("scheduledDate");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "revisions"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "parts"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "suppliers"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "clients"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "team_members"`);
    }
}
