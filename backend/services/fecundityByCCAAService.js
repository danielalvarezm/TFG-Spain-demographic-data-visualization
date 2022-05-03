import {FecundityModel} from '../models/fecundityByCCAAModel.js';

async function fecundityDataToDB(finalDataset) {
  // First delete all the data in the database
  await FecundityModel.deleteMany({});
  // Then insert the new data
  for (let i = 0; i < finalDataset.length; i++) {
    const data = finalDataset[i];
    const newFecundity = new FecundityModel({
      id: data.id,
      ccaa: data.ccaa,
      values: data.values,
    });
    await newFecundity.save();
  }
}

export {fecundityDataToDB};
