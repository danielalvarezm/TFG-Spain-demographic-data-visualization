import {InfantMortalityRateModel} from '../models/infantMortalityRateModel.js';

async function infantMortalityRateDataToDB(finalDataset) {
  // First delete all the data in the database
  await InfantMortalityRateModel.deleteMany({});
  // Then insert the new data
  for (let i = 0; i < finalDataset.length; i++) {
    const data = finalDataset[i];
    const newInfantMortalityRate = new InfantMortalityRateModel({
      id: data.id,
      ccaa: data.ccaa,
      total_value: data.total_value,
      male_value: data.male_value,
      female_value: data.female_value,
    });
    await newInfantMortalityRate.save();
  }
}

export {infantMortalityRateDataToDB};
