import {FecundityModel} from '../models/fecundityByCCAAModel.jsdel.js';

async function fecundityDataToDB (final_dataset) {
  // First delete all the data in the database
  await FecundityModel.deleteMany({});

  // Then insert the new data
  for (let i = 0; i < final_dataset.length; i++) {
    const data = final_dataset[i];
    const newFecundity = new FecundityModel({
      id: data.id,
      ccaa: data.ccaa,
      values: data.values

    });

    await newFecundity.save();
  }
}

export {fecundityDataToDB};
