import { Document } from 'mongoose';

export interface IMongooseFacility extends Document {
  id: string;
  name: string;
}
