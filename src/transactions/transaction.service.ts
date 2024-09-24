import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionService {
  async executeInTransaction<T>(entityManager: EntityManager, action: (transactionManager: EntityManager) => Promise<T>): Promise<T> {
    return await entityManager.transaction(async (transactionManager) => {
      return await action(transactionManager); // Call action with the transaction manager
    });
  }
}