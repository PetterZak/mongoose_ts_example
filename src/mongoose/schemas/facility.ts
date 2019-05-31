import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const facilitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { collection: 'facility' });
