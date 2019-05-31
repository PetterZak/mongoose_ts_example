import { Document } from 'mongoose';

export interface IRepository<T extends Document> {
  addAsync(entity: T): Promise<T>;
  addListAsync(entityArray: T[]): Promise<T[]>;
  updateAsync(id: string | number, update: object): Promise<T>;
  removeAsync(conditions: object): Promise<void>;
  removeListAsync(conditions: object): Promise<void>;
  countAsync(): Promise<number>;
  getAsync(id: string): Promise<T>;
  getAllAsync(): Promise<T[]>;
  findAsync(conditions: object): Promise<T>;
  findManyAsync(conditions: object): Promise<T[]>;
  markAsDeletedAsync(id: string): Promise<void>;
  markAsUndeletedAsync(id: string): Promise<void>;
}
