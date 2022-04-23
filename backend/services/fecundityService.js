import {FecundityModel} from '../models/fecundityModel.js';

async function fecundityDataToDB (final_dataset) {
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
