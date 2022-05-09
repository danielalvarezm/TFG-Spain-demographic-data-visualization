import {AmountOfBirthsModel} from '../models/amountOfBirthsByCCAAModel.js';

async function amountOfBirthsDataToDB(finalDataset) {
  await AmountOfBirthsModel.deleteMany({});

  for (let i = 0; i < finalDataset.length; i++) {
    const data = finalDataset[i];
    const newAmountOfBirths = new AmountOfBirthsModel({
      id: data.id,
      ccaa: data.ccaa,
      values: data.values,
    });
    await newAmountOfBirths.save();
  }
}

async function getAmountOfBirthsData() {
  const amountOfBirths = await AmountOfBirthsModel.find({});
  return amountOfBirths;
}

export {amountOfBirthsDataToDB, getAmountOfBirthsData};
