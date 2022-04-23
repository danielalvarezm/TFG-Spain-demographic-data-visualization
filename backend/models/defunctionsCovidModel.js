import mongoose from 'mongoose';

const CovidSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  age: { type: String, required: true },
  male_values: { type: Number, required: true }, 
  female_values: { type: Number, required: true },
  total_values: { type: Number, required: true }   
});

const CovidModel = mongoose.model('Defunctions_covid', CovidSchema, 'defunctions_covid')

export {CovidModel}
