import {PopulationModel} from '../models/population-model.js';

async function populationDataToDB (final_dataset) {
  for(let i = 0; i < final_dataset.length; i++) {
    const data = final_dataset[i];
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

export {populationDataToDB};
