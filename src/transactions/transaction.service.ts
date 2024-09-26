import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {} // Inject DataSource

  async handleTransaction<T>(callback: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Transaction failed:", error); // Log the error
      throw new HttpException("An error occurred during the transaction", HttpStatus.INTERNAL_SERVER_ERROR); // Use HttpException
    } finally {
      await queryRunner.release(); // Ensure queryRunner is released
    }
  }
}
