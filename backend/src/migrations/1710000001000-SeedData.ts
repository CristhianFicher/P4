import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedData1710000001000 implements MigrationInterface {
    name = 'SeedData1710000001000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Team members
        await queryRunner.query(`INSERT INTO team_members ("name", "role", "phone", "email", "active", "expertiseLevel", "certificationExpiry", "hiredAt")
        VALUES
        ('Carlos Souza','Mecanico','11999990001','carlos@redcar.com', true, 'Senior','2099-12-31','2020-01-10'),
        ('Ana Lima','Eletricista','11999990002','ana@redcar.com', true, 'Pleno','2099-12-31','2021-03-15'),
        ('Bruno Dias','Atendimento','11999990003','bruno@redcar.com', true, 'Junior','2099-12-31','2022-05-20');`);

        // Clients
        await queryRunner.query(`INSERT INTO clients ("name", "phone", "email", "vehicle", "licensePlate", "lastVisit", "tier", "active")
        VALUES
        ('Mariana Alves','11988887777','mariana@example.com','Civic 2.0','ABC1D23','2024-10-10','Gold', true),
        ('João Pereira','11977776666','joao@example.com','Onix 1.4','DEF2E34','2024-09-05','Standard', true);`);

        // Suppliers
        await queryRunner.query(`INSERT INTO suppliers ("company", "contactName", "phone", "email", "category", "leadTimeDays", "preferred", "rating", "lastOrderDate")
        VALUES
        ('AutoPecas Brasil','Lucia','1133334444','contato@autopecas.com','Pecas originais', 7, true, 4.5, '2024-11-01'),
        ('Rodas & Pneus','Paulo','1144445555','vendas@rodas.com','Pneus', 5, false, 3.8, '2024-10-20');`);

        // Parts
        await queryRunner.query(`INSERT INTO parts ("name", "code", "quantity", "minStock", "location", "supplier", "category", "unitCost")
        VALUES
        ('Filtro de Óleo', 'FLT-001', 12, 5, 'A1-01', 'AutoPecas Brasil', 'Mecanica', 32.90),
        ('Pastilha de Freio', 'PST-123', 3, 5, 'A1-02', 'AutoPecas Brasil', 'Mecanica', 120.00),
        ('Pneu 195/55 R15', 'PN-19555', 8, 4, 'B2-10', 'Rodas & Pneus', 'Suspensao', 350.00);`);

        // Revisions (upcoming dates)
        const future = new Date();
        future.setDate(future.getDate() + 7);
        const d = future.toISOString();
        await queryRunner.query(`INSERT INTO revisions ("clientName", "clientPhone", "vehicleModel", "licensePlate", "serviceDescription", "scheduledDate", "scheduledTime", "status", "priority", "remindersEnabled")
        VALUES
        ('Mariana Alves','11988887777','Civic 2.0','ABC1D23','Revisão 40k km', '${d}', '10:00', 'agendada', 'media', true),
        ('João Pereira','11977776666','Onix 1.4','DEF2E34','Troca de pastilhas', '${d}', '14:00', 'agendada', 'alta', false);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM revisions;`);
        await queryRunner.query(`DELETE FROM parts;`);
        await queryRunner.query(`DELETE FROM suppliers;`);
        await queryRunner.query(`DELETE FROM clients;`);
        await queryRunner.query(`DELETE FROM team_members;`);
    }
}
