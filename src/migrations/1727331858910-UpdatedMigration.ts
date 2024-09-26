// import {
//     MigrationInterface,
//     QueryRunner,
//     Table,
//     TableForeignKey,
//   } from 'typeorm';

//   export class UpdatedMigration1727331858910 implements MigrationInterface {
//     public async up(queryRunner: QueryRunner): Promise<void> {
//       // Create Employee table
//       await queryRunner.createTable(
//         new Table({
//           name: 'employee',
//           columns: [
//             {
//               name: 'empId',
//               type: 'int',
//               isPrimary: true,
//               isGenerated: true,
//               generationStrategy: 'increment',
//             },
//             {
//               name: 'firstName',
//               type: 'varchar',
//             },
//             {
//               name: 'lastName',
//               type: 'varchar',
//             },
//             {
//               name: 'email',
//               type: 'varchar',
//               isUnique: true,
//             },
//             {
//               name: 'address',
//               type: 'varchar',
//             },
//             {
//               name: 'dob',
//               type: 'varchar',
//             },
//             {
//               name: 'phoneNumber',
//               type: 'varchar',
//             },
//             {
//               name: 'createdAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'updatedAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//               onUpdate: 'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'deletedAt',
//               type: 'timestamp',
//               isNullable: true,
//             },
//             {
//               name: 'createdBy',
//               type: 'int',
//               isNullable: true,
//             },
//             {
//               name: 'updatedBy',
//               type: 'int',
//               isNullable: true,
//             },
//           ],
//         }),
//       );

//       // Create Department table
//       await queryRunner.createTable(
//         new Table({
//           name: 'department',
//           columns: [
//             {
//               name: 'deptID',
//               type: 'int',
//               isPrimary: true,
//               isGenerated: true,
//               generationStrategy: 'increment',
//             },
//             {
//               name: 'deptName',
//               type: 'varchar',
//             },
//             {
//               name: 'createdAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'updatedAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//               onUpdate: 'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'deletedAt',
//               type: 'timestamp',
//               isNullable: true,
//             },
//             {
//               name: 'createdBy',
//               type: 'int',
//               isNullable: true,
//             },
//             {
//               name: 'updatedBy',
//               type: 'int',
//               isNullable: true,
//             },
//           ],
//         }),
//       );

//       // Create Medicines table
//       await queryRunner.createTable(
//         new Table({
//           name: 'medicines',
//           columns: [
//             {
//               name: 'medId',
//               type: 'int',
//               isPrimary: true,
//               isGenerated: true,
//               generationStrategy: 'increment',
//             },
//             {
//               name: 'medName',
//               type: 'varchar',
//             },
//             {
//               name: 'dosage',
//               type: 'varchar',
//             },
//             {
//               name: 'sideEffects',
//               type: 'text',
//             },
//             {
//               name: 'createdAt',
//               type: 'timestamp',
//               default: 'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'updatedAt',
//               type: 'timestamp',
//               default: 'CURRENT_TIMESTAMP',
//               onUpdate: 'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'deletedAt',
//               type: 'timestamp',
//               isNullable: true,
//             },{
//                 name: 'createdBy',
//                 type: 'int',
//                 isNullable: true,
//               },{
//                 name: 'updatedBy',
//                 type: 'int',
//                 isNullable: true,
//               },
//           ],
//         }),
//       );

//       // Create Appointments table
//       await queryRunner.createTable(
//         new Table({
//           name: 'appointments',
//           columns: [
//             {
//               name: 'appId',
//               type: 'int',
//               isPrimary: true,
//               isGenerated: true,
//               generationStrategy: 'increment',
//             },
//             {
//               name: 'patientId',
//               type: 'int',
//               isGenerated:true
//             },
//             {
//               name: 'empId',
//               type: 'int',
//               isGenerated:true
//             },
//             {
//               name: 'appDate',
//               type: 'varchar',
//             },{
//                 name:'cause',
//                 type:'text'
//             },
//             {
//               name: 'createdAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'updatedAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//               onUpdate: 'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'deletedAt',
//               type: 'timestamp',
//               isNullable: true,
//             },
//             {
//               name: 'createdBy',
//               type: 'int',
//               isNullable: false,
//             },
//             {
//               name: 'updatedBy',
//               type: 'int',
//               isNullable: false,
//             },
//           ],
//         }),
//       );

//       // Create Patient table
//       await queryRunner.createTable(
//         new Table({
//           name: 'patient',
//           columns: [
//             {
//               name: 'patientId',
//               type: 'int',
//               isPrimary: true,
//               isGenerated: true,
//               generationStrategy: 'increment',
//             },
//             {
//               name: 'firstName',
//               type: 'varchar',
//             },
//             {
//               name: 'lastName',
//               type: 'varchar',
//             },
//             {
//               name: 'email',
//               type: 'varchar',
//               isUnique: true,
//             },
//             {
//                 name:'password',
//                 type:'varchar',
//                 isUnique:true
//               },
//             {
//               name: 'address',
//               type: 'varchar',
//             },
//             {
//               name: 'dob',
//               type: 'varchar',
//             },
//             {
//               name: 'phoneNumber',
//               type: 'varchar',
//             },
//             {
//               name: 'empId',
//               type: 'int',
//               isNullable: true,
//             },
//             {
//               name: 'deptID',
//               type: 'int',
//               isNullable: true,
//             },
//             {
//               name: 'createdAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'updatedAt',
//               type: 'timestamp',
//               default:  'CURRENT_TIMESTAMP',
//               onUpdate: 'CURRENT_TIMESTAMP',
//             },
//             {
//               name: 'deletedAt',
//               type: 'timestamp',
//               isNullable: true,
//             },
//             {
//               name: 'createdBy',
//               type: 'int',
//               isNullable: true,
//             },
//             {
//               name: 'updatedBy',
//               type: 'int',
//               isNullable: true,
//             }
//           ],
//         }),
//       );

//       // Set up Foreign Key for Employee in Patient
//       await queryRunner.createForeignKey(
//         'patient',
//         new TableForeignKey({
//           name: 'FK_patient_empId',
//           columnNames: ['empId'],
//           referencedTableName: 'employee',
//           referencedColumnNames: ['empId'],
//           onDelete: 'SET NULL',
//         }),
//       );

//       // Set up Foreign Key for Department in Patient
//       await queryRunner.createForeignKey(
//         'patient',
//         new TableForeignKey({
//           name: 'FK_patient_deptID',
//           columnNames: ['deptID'],
//           referencedTableName: 'department',
//           referencedColumnNames: ['deptID'],
//           onDelete: 'SET NULL',
//         }),
//       );

//       // Set up Foreign Key for Patient in Appointments
//       await queryRunner.createForeignKey(
//         'appointments',
//         new TableForeignKey({
//           name: 'FK_appointments_patientId',
//           columnNames: ['patientId'],
//           referencedTableName: 'patient',
//           referencedColumnNames: ['patientId'],
//           onDelete: 'CASCADE',
//         }),
//       );

//       // Set up Foreign Key for Employee in Appointments
//       await queryRunner.createForeignKey(
//         'appointments',
//         new TableForeignKey({
//           name: 'FK_appointments_empId',
//           columnNames: ['empId'],
//           referencedTableName: 'employee',
//           referencedColumnNames: ['empId'],
//           onDelete: 'SET NULL',
//         }),
//       );
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//       // Drop foreign keys in reverse order of creation
//       await queryRunner.dropForeignKey('appointments', 'FK_appointments_empId');
//       await queryRunner.dropForeignKey('appointments', 'FK_appointments_patientId');
//       await queryRunner.dropForeignKey('patient', 'FK_patient_deptID');
//       await queryRunner.dropForeignKey('patient', 'FK_patient_empId');

//       // Drop the tables in reverse order of dependencies
//       await queryRunner.dropTable('appointments');
//       await queryRunner.dropTable('patient');
//       await queryRunner.dropTable('medicines');
//       await queryRunner.dropTable('department');
//       await queryRunner.dropTable('employee');
//     }
//   }
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class UpdatedMigration1727331858910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Employee table
    await queryRunner.createTable(
      new Table({
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
            isNullable: true, // Set to nullable
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
            isNullable: true,
          },
          {
            name: 'updatedBy',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    // Create Department table
    await queryRunner.createTable(
      new Table({
        name: 'department',
        columns: [
          {
            name: 'deptID',
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
            isNullable: true, // Set to nullable
          },
          {
            name: 'patientId',
            type: 'int',
            isNullable: true, // Set to nullable
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
            isNullable: true,
          },
          {
            name: 'updatedBy',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    // Create Medicines table
    await queryRunner.createTable(
      new Table({
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
            name: 'dosage',
            type: 'varchar',
          },
          {
            name: 'reason',
            type: 'text',
          },
          {
            name: 'empId',
            type: 'int',
            isNullable: true, // Set to nullable
          },
          {
            name: 'patientId',
            type: 'int',
            isNullable: true, // Set to nullable
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
            isNullable: true,
          },
          {
            name: 'updatedBy',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    // Create Appointments table
    await queryRunner.createTable(
      new Table({
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
            name: 'patientId',
            type: 'int',
            isNullable: true, // Set to nullable
          },
          {
            name: 'empId',
            type: 'int',
            isNullable: true, // Set to nullable
          },
          {
            name: 'cause',
            type: 'text',
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
            isNullable: false,
          },
          {
            name: 'updatedBy',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    // Create Patient table
    await queryRunner.createTable(
      new Table({
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
            name: 'password',
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
            isNullable: true,
          },
          {
            name: 'deptID',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'appId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'medId',
            type: 'int',
            isNullable: true,
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
            isNullable: true,
          },
          {
            name: 'updatedBy',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    // Set up Foreign Key for Employee in Patient
    await queryRunner.createForeignKey(
      'patient',
      new TableForeignKey({
        name: 'FK_patient_empId',
        columnNames: ['empId'],
        referencedTableName: 'employee',
        referencedColumnNames: ['empId'],
        onDelete: 'SET NULL',
      }),
    );

    // Set up Foreign Key for Department in Patient
    await queryRunner.createForeignKey(
      'patient',
      new TableForeignKey({
        name: 'FK_patient_deptID',
        columnNames: ['deptID'],
        referencedTableName: 'department',
        referencedColumnNames: ['deptID'],
        onDelete: 'SET NULL',
      }),
    );

    // Set up Foreign Key for Patient in Appointments
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'FK_appointments_patientId',
        columnNames: ['patientId'],
        referencedTableName: 'patient',
        referencedColumnNames: ['patientId'],
        onDelete: 'CASCADE',
      }),
    );

    // Set up Foreign Key for Employee in Appointments
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'FK_appointments_empId',
        columnNames: ['empId'],
        referencedTableName: 'employee',
        referencedColumnNames: ['empId'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys in reverse order of creation
    await queryRunner.dropForeignKey('appointments', 'FK_appointments_empId');
    await queryRunner.dropForeignKey(
      'appointments',
      'FK_appointments_patientId',
    );
    await queryRunner.dropForeignKey('patient', 'FK_patient_deptID');
    await queryRunner.dropForeignKey('patient', 'FK_patient_empId');

    // Drop the tables in reverse order of dependencies
    await queryRunner.dropTable('appointments');
    await queryRunner.dropTable('patient');
    await queryRunner.dropTable('medicines');
    await queryRunner.dropTable('department');
    await queryRunner.dropTable('employee');
  }
}
