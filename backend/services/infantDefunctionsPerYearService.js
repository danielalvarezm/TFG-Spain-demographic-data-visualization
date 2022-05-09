import {InfantDefunctionsPerYearModel} from '../models/infantDefunctionsPerYearModel.js';

async function infantDefunctionsPerYearDataToDB(finalDataset) {
  await InfantDefunctionsPerYearModel.deleteMany({});

  for (let i = 0; i < finalDataset.length; i++) {
    const data = finalDataset[i];
    const newInfantDefunctionsPerYear = new InfantDefunctionsPerYearModel({
      id: data.id,
      interval: data.interval,
      value: data.value,
    });
    await newInfantDefunctionsPerYear.save();
  }
}

async function getInfantDefunctionsPerYearData() {
  const infantDefunctionsPerYearData = await InfantDefunctionsPerYearModel.find({});
  return infantDefunctionsPerYearData;
}

export {infantDefunctionsPerYearDataToDB, getInfantDefunctionsPerYearData};
