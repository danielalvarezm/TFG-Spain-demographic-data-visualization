import mongoose from 'mongoose';

const AmountOfBirthsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  ccaa: { type: String, required: true },
  values: [{
    interval: { type: Number, required: true },
    value: { type: Number, required: true }
  }],
});

const AmountOfBirthsModel = mongoose.model('Amount_of_births', AmountOfBirthsSchema, 'amount_of_births');

export {AmountOfBirthsModel}
