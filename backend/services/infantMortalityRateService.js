import { infantMortalityRateService } from './infantMortalityRateService';

async function infantMortalityRateDataToDB (final_dataset) {
  // First delete all the data in the database
  await infantMortalityRateService.deleteMany({});

  // Then insert the new data
  for (let i = 0; i < final_dataset.length; i++) {
    const data = final_dataset[i];
    const newInfantMortalityRate = new infantMortalityRateService({
      id: data.id,
      ccaa: data.ccaa,
      total_value: data.total_value,
      male_value: data.male_value,
      female_value: data.female_value
    });

    await newInfantMortalityRate.save();
  }
}

export { infantMortalityRateDataToDB }
