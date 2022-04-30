import {NatalityModel} from '../models/natalityByCCAAModel.js';

async function natalityDataToDB (final_dataset) {
  // First delete all the data in the database
  await NatalityModel.deleteMany({});

  // Then insert the new data
  for (let i = 0; i < final_dataset.length; i++) {
    const data = final_dataset[i];
    const newNatality = new NatalityModel({
      id: data.id,
      ccaa: data.ccaa,
      values: data.values

    });

    await newNatality.save();
  }
}

export {natalityDataToDB};
