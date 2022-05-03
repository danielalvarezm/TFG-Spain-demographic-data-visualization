import mongoose from "mongoose";

const InfantMortalityRateSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  year: { type: Number, required: true },
  total_value: { type: Number, required: true },
  male_value: { type: Number, required: true },
  female_value: { type: Number, required: true }
});

const InfantMortalityRateModel = mongoose.model('Infant_mortality_rate', InfantMortalityRateSchema, 'infant_mortality_rate');

export { InfantMortalityRateModel }
