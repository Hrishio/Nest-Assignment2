import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJunctionTables1726979496643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create patient_employee junction table
    await queryRunner.query(`
      CREATE TABLE "patient_employee" (
        "id" SERIAL PRIMARY KEY,
        "interactionType" VARCHAR(255),
        "interactionDate" TIMESTAMP,
        "patientId" INT NOT NULL,
        "empId" INT NOT NULL,
        CONSTRAINT "FK_patient_employee_patient" FOREIGN KEY ("patientId") REFERENCES "patient"("patientId") ON DELETE CASCADE,
        CONSTRAINT "FK_patient_employee_employee" FOREIGN KEY ("empId") REFERENCES "employee"("empId") ON DELETE CASCADE
      );
    `);

    // Create patient_appointment junction table
    await queryRunner.query(`
      CREATE TABLE "patient_appointment" (
        "id" SERIAL PRIMARY KEY,
        "patientId" INT NOT NULL,
        "appId" INT NOT NULL,
        CONSTRAINT "FK_patient_appointment_patient" FOREIGN KEY ("patientId") REFERENCES "patient"("patientId") ON DELETE CASCADE,
        CONSTRAINT "FK_patient_appointment_appointment" FOREIGN KEY ("appId") REFERENCES "appointments"("appId") ON DELETE CASCADE
      );
    `);

    // Create patient_medicine junction table
    await queryRunner.query(`
      CREATE TABLE "patient_medicine" (
        "id" SERIAL PRIMARY KEY,
        "dose" VARCHAR(255),
        "prescriptionDate" TIMESTAMP,
        "patientId" INT NOT NULL,
        "medId" INT NOT NULL,
        CONSTRAINT "FK_patient_medicine_patient" FOREIGN KEY ("patientId") REFERENCES "patient"("patientId") ON DELETE CASCADE,
        CONSTRAINT "FK_patient_medicine_medicine" FOREIGN KEY ("medId") REFERENCES "medicines"("medId") ON DELETE CASCADE
      );
    `);

    // Create employee_department junction table
    await queryRunner.query(`
      CREATE TABLE "employee_department" (
        "id" SERIAL PRIMARY KEY,
        "startDate" TIMESTAMP,
        "endDate" TIMESTAMP,
        "empId" INT NOT NULL,
        "deptId" INT NOT NULL,
        CONSTRAINT "FK_employee_department_employee" FOREIGN KEY ("empId") REFERENCES "employee"("empId") ON DELETE CASCADE,
        CONSTRAINT "FK_employee_department_department" FOREIGN KEY ("deptId") REFERENCES "department"("deptId") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop employee_department junction table
    await queryRunner.query(`
      DROP TABLE "employee_department";
    `);

    // Drop patient_medicine junction table
    await queryRunner.query(`
      DROP TABLE "patient_medicine";
    `);

    // Drop patient_appointment junction table
    await queryRunner.query(`
      DROP TABLE "patient_appointment";
    `);

    // Drop patient_employee junction table
    await queryRunner.query(`
      DROP TABLE "patient_employee";
    `);
  }
}
