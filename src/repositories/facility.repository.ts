import { IMongooseFacility } from '../mongoose/interfaces/facility.interface';
import { Repository } from './repository';
import { facilityModel } from '../mongoose/models';

export class FacilityRepository extends Repository<IMongooseFacility> {
  constructor() {
    super(facilityModel);
  }
}
