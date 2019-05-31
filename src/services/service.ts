import { FacilityRepository } from '../repositories/facility.repository';
import { FacilityModel } from '../models/facility.model';
import { facilityModel } from '../mongoose/models';

export class Service {

  private facilityRepository: FacilityRepository;

  constructor() {
    this.facilityRepository = new FacilityRepository();
  }

  public async getFacilityData(id: string): Promise<FacilityModel> {
    try {
      const facility = await this.facilityRepository.getAsync(id);
      const result = new FacilityModel(facility);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public async getFacilities(): Promise<FacilityModel[]> {
    try {
      const facilities = await this.facilityRepository.getAllAsync();
      const result = facilities.map((item) => new FacilityModel(item));
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public async addFacility(model: FacilityModel): Promise<FacilityModel> {
    try {
      const newFacility = new facilityModel({
        name: model.name
      });
      await this.facilityRepository.addAsync(newFacility);
      const result = new FacilityModel(newFacility);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
