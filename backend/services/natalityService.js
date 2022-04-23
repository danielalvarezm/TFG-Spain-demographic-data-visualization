import {NatalityModel} from '../models/natalityModel.js';

async function natalityDataToDB (final_dataset) {
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
