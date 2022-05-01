import { AmountOfBirthsModel } from "../models/amountOfBirthsByCCAAModel.js";

async function amountOfBirthsDataToDB (final_dataset) {
  await AmountOfBirthsModel.deleteMany({});

  for (let i = 0; i < final_dataset.length; i++) {
    const data = final_dataset[i];
    const newAmountOfBirths = new AmountOfBirthsModel({
      id: data.id,
      ccaa: data.ccaa,
      values: data.values

    });

    await newAmountOfBirths.save();
  }
}

export { amountOfBirthsDataToDB };
