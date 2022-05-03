import {NatalityModel} from '../models/natalityByCCAAModel.js';

async function natalityDataToDB(finalDataset) {
  await NatalityModel.deleteMany({});

  for (let i = 0; i < finalDataset.length; i++) {
    const data = finalDataset[i];
    const newNatality = new NatalityModel({
      id: data.id,
      ccaa: data.ccaa,
      values: data.values,
    });
    await newNatality.save();
  }
}

async function getNatalityData() {
  const natalityData = await NatalityModel.find({});
  return natalityData;
}

export {natalityDataToDB, getNatalityData};
