import mongoose from 'mongoose';

const DefunctionsCovidSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  age: {type: String, required: true},
  male_values: {type: Number, required: true},
  female_values: {type: Number, required: true},
  total_values: {type: Number, required: true},
});

const DefunctionsCovidModel = mongoose.model('Defunctions_covid', DefunctionsCovidSchema, 'defunctions_covid');

export {DefunctionsCovidModel};
