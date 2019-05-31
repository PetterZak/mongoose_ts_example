import { Document, Model } from 'mongoose';
import { IRepository } from './interfaces/iRepository';

export abstract class Repository<T extends Document> implements IRepository<T> {

  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async addAsync(entity: T): Promise<T> {
    const result = await this._model.create(entity);
    return result;
  }

  public async addListAsync(entityArray: T[]): Promise<T[]> {
    const result = await this._model.insertMany(entityArray);
    return result;
  }

  public async updateAsync(id: string | number, update: object): Promise<T> {
    const options = { new: true };
    const result = await this._model.findByIdAndUpdate(id, update, options);
    return result;
  }

  public async updateListAsync(conditions: object, update: object): Promise<T[]> {
    const options = { new: true };
    const result = await this._model.updateMany(conditions, update, options);
    return result;
  }

  public async removeAsync(conditions: object): Promise<void> {
    await this._model.findOneAndDelete(conditions);
  }

  public async removeListAsync(conditions: object): Promise<void> {
    await this._model.deleteMany(conditions);
  }

  public async countAsync(): Promise<number> {
    const count = await this._model.count({});
    return count;
  }

  public async countFilteredAsync(conditions: object): Promise<number> {
    const count = await this._model.count(conditions);
    return count;
  }

  public async getAsync(id: string): Promise<T> {
    const result = await this._model.findById(id);
    return result;
  }

  public async getAllAsync(): Promise<T[]> {
    const result = await this._model.find();
    return result;
  }

  public async findAsync(conditions: object): Promise<T> {
    const result = await this._model.findOne(conditions);
    return result;
  }

  public async findManyAsync(conditions: object): Promise<T[]> {
    const result = await this._model.find(conditions);
    return result;
  }

  public async markAsDeletedAsync(id: string): Promise<void> {
    const update = { deleted: true };
    await this._model.findByIdAndUpdate(id, update);
  }

  public async markAsUndeletedAsync(id: string): Promise<void> {
    const update = { deleted: false };
    await this._model.findByIdAndUpdate(id, update);
  }
}
