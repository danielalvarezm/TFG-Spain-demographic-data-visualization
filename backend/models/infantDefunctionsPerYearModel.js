import mongoose from 'mongoose';

const InfantDefunctionsPerYearSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  interval: {type: Number, required: true},
  value: {type: Number, required: true},
});

const InfantDefunctionsPerYearModel = mongoose.model('Infant_defunctions_per_year', InfantDefunctionsPerYearSchema, 'infant_defunctions_per_year');

export {InfantDefunctionsPerYearModel};
