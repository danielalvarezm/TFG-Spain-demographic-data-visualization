import {NatalityModel} from '../models/natalityByCCAAModel.js';

async function natalityDataToDB (final_dataset) {
  await NatalityModel.deleteMany({});

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

async function getNatalityData () {
  const natalityData = await NatalityModel.find({});
  return natalityData;
}

export {natalityDataToDB};
