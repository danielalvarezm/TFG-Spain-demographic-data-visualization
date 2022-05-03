import {PopulationModel} from '../models/populationByCCAAModel.js';

async function populationDataToDB(finalDataset) {
  await PopulationModel.deleteMany({});

  for (let i = 0; i < finalDataset.length; i++) {
    const data = finalDataset[i];
    const newPopulation = new PopulationModel({
      id: data.id,
      ccaa: data.ccaa,
      male_values: data.male_values,
      female_values: data.female_values,
      total_values: data.total_values,
    });
    await newPopulation.save();
  }
}

async function getPopulationData() {
  const populationData = await PopulationModel.find({});
  return populationData;
}

export {populationDataToDB, getPopulationData};
