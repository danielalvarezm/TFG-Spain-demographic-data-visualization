import {DefunctionsCovidModel} from '../models/defunctionsCovidModel.js';

async function defunctionsCovidDataToDB (final_dataset) {
  // First delete all the data in the database
  await DefunctionsCovidModel.deleteMany({});

  // Then insert the new data
  for (let i = 0; i < final_dataset.length; i++) {
    const data = final_dataset[i];

    const newCovid = new DefunctionsCovidModel({
      id: data.id,
      age: data.age,
      male_values: data.male_values,
      female_values: data.female_values,
      total_values: data.total_values
    });

    await newCovid.save();
  }
}

export {defunctionsCovidDataToDB};
