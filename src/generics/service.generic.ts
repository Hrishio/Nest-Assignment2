import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GenericService<T> {
  public readonly secretKey = 'jsutlikethis';
  public readonly accessTokenExpiry = '15m';
  public readonly refreshTokenExpiry = '30m';
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

  generateToken(payload: object): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, this.secretKey, {
      expiresIn: this.accessTokenExpiry,
    });
    const refreshToken = jwt.sign(payload, this.secretKey, {
      expiresIn: this.refreshTokenExpiry,
    });

    return { accessToken, refreshToken };
  }

  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.secretKey) as object;
    } catch (error) {
      return null;
    }
  }
}
