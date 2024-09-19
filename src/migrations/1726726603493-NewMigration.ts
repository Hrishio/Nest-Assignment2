import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class NewMigration1726726603493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Patient table
        await queryRunner.createTable(new Table({
            name: 'patient',
            columns: [
                {
                    name: 'patientId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                },
                {
                    name: 'dob',
                    type: 'varchar',
                },
                {
                    name: 'phoneNumber',
                    type: 'varchar',
                },
                {
                    name: 'empId',
                    type: 'int',
                },
                {
                    name: 'deptID',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'appId',
                    type: 'int',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'createdBy',
                    type: 'int',
                },
                {
                    name: 'updatedBy',
                    type: 'int',
                },
            ],
        }));

        // Create Medicines table
        await queryRunner.createTable(new Table({
            name: 'medicines',
            columns: [
                {
                    name: 'medId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'medName',
                    type: 'varchar',
                },
                {
                    name: 'reason',
                    type: 'varchar',
                },
                {
                    name: 'empId',
                    type: 'int',
                },
                {
                    name: 'patientId',
                    type: 'int',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'createdBy',
                    type: 'int',
                },
                {
                    name: 'updatedBy',
                    type: 'int',
                },
            ],
        }));

        // Create Employee table
        await queryRunner.createTable(new Table({
            name: 'employee',
            columns: [
                {
                    name: 'empId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                },
                {
                    name: 'dob',
                    type: 'varchar',
                },
                {
                    name: 'phoneNumber',
                    type: 'varchar',
                },
                {
                    name: 'patientId',
                    type: 'int',
                },
                {
                    name: 'deptId',
                    type: 'int',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'createdBy',
                    type: 'int',
                },
                {
                    name: 'updatedBy',
                    type: 'int',
                },
            ],
        }));

        // Create Department table
        await queryRunner.createTable(new Table({
            name: 'department',
            columns: [
                {
                    name: 'deptId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'deptName',
                    type: 'varchar',
                },
                {
                    name: 'location',
                    type: 'varchar',
                },
                {
                    name: 'empId',
                    type: 'int',
                },
                {
                    name: 'patientId',
                    type: 'int',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'createdBy',
                    type: 'int',
                },
                {
                    name: 'updatedBy',
                    type: 'int',
                },
            ],
        }));

        // Create Appointments table
        await queryRunner.createTable(new Table({
            name: 'appointments',
            columns: [
                {
                    name: 'appId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'appDate',
                    type: 'varchar',
                },
                {
                    name: 'cause',
                    type: 'varchar',
                },
                {
                    name: 'empId',
                    type: 'int',
                },
                {
                    name: 'patientId',
                    type: 'int',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'createdBy',
                    type: 'int',
                },
                {
                    name: 'updatedBy',
                    type: 'int',
                },
            ],
        }));

        // Add foreign keys
        await queryRunner.createForeignKey('patient', new TableForeignKey({
            columnNames: ['empId'],
            referencedTableName: 'employee',
            referencedColumnNames: ['empId'],
        }));

        await queryRunner.createForeignKey('medicines', new TableForeignKey({
            columnNames: ['empId'],
            referencedTableName: 'employee',
            referencedColumnNames: ['empId'],
        }));

        await queryRunner.createForeignKey('medicines', new TableForeignKey({
            columnNames: ['patientId'],
            referencedTableName: 'patient',
            referencedColumnNames: ['patientId'],
        }));

        await queryRunner.createForeignKey('employee', new TableForeignKey({
            columnNames: ['deptId'],
            referencedTableName: 'department',
            referencedColumnNames: ['deptId'],
        }));

        await queryRunner.createForeignKey('patient', new TableForeignKey({
            columnNames: ['deptID'],
            referencedTableName: 'department',
            referencedColumnNames: ['deptId'],
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['patientId'],
            referencedTableName: 'patient',
            referencedColumnNames: ['patientId'],
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['empId'],
            referencedTableName: 'employee',
            referencedColumnNames: ['empId'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        await queryRunner.dropForeignKey('appointments', 'FK_appointments_patientId');
        await queryRunner.dropForeignKey('appointments', 'FK_appointments_empId');
        await queryRunner.dropForeignKey('medicines', 'FK_medicines_patientId');
        await queryRunner.dropForeignKey('medicines', 'FK_medicines_empId');
        await queryRunner.dropForeignKey('employee', 'FK_employee_deptId');
        await queryRunner.dropForeignKey('patient', 'FK_patient_deptID');

        // Drop tables
        await queryRunner.dropTable('appointments');
        await queryRunner.dropTable('medicines');
        await queryRunner.dropTable('employee');
        await queryRunner.dropTable('department');
        await queryRunner.dropTable('patient');
    }
}




// 