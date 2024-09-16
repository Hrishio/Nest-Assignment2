import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class GenericService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  update(id: number, data: DeepPartial<T>): Promise<T> {
    return this.repository.save({ ...data, id } as any);
  }

  async remove(id: number): Promise<void> {
    return await this.repository.delete(id).then(() => undefined);
  }
}
