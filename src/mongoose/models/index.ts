import * as mongoose from 'mongoose';
import { IMongooseFacility } from '../interfaces/facility.interface';
import { facilitySchema } from '../schemas/facility';

export const facilityModel = mongoose.model<IMongooseFacility>('Facility', facilitySchema);
