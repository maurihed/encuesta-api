import { hash } from "bcryptjs";
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdminUser1641908070840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const [{ id }] = await queryRunner.query(`INSERT INTO "roles" ("name") VALUES ('Administrator') RETURNING id`);
        const password = await hash(".", 12);
        await queryRunner.query(`
            INSERT INTO "users"
                ("email", "firstName", "lastName", "password", "roleId")
            VALUES
                ('admin@admin.com', 'Cochi', 'Loco', '${password}', ${id})
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "roles" WHERE "name" = 'Administrator'`);
        await queryRunner.query(`DELETE FROM "users"
            WHERE "roleId" IS NULL
            AND "email" = 'admin@admin.com'
            AND "firstName" = 'Cochi'
            AND "lastName" = 'Loco'
        `);
    }

}
