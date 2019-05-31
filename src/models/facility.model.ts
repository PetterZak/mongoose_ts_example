import { IMongooseFacility } from '../mongoose/interfaces/facility.interface';

export class FacilityModel {
  public id: string;
  public name: string;

  constructor(data: IMongooseFacility) {
    this.id = data.id;
    this.name = data.name;
  }
}
