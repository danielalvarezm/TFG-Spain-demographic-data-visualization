import {getNatalityData} from '../services/natalityByCCAAService.js';
import {getPopulationData} from '../services/populationByCCAAService.js';
import {amountOfBirthsDataToDB} from '../services/amountOfBirthsByCCAAService.js';

export async function amountOfBirthsFetchData() {
  try {
    const natalityData = await getNatalityData();
    const populationData = await getPopulationData();
    const finalDataset = [];

    for (let i = 0; i < natalityData.length; i++) {
      const ccaa = natalityData[i].ccaa;
      const natalities = natalityData[i].values;
      const populations = populationData[i].total_values;
      populations.shift();

      const values = [];
      for (let j = 0; j < natalities.length; j++) {
        const year = natalities[j].interval;
        const natality = natalities[j].value;
        const population = populations[j].value;
        const amountOfBirths = (natality * population) / 1000;

        values.push({
          interval: year,
          value: parseInt(amountOfBirths * 1000, 10) / 1000,
        });
      }

      finalDataset.push({
        id: i,
        ccaa: ccaa,
        values: values,
      });
    }

    await amountOfBirthsDataToDB(finalDataset);
    console.log('Dataset saved: amount of births by CCAA');
  } catch (error) {
    console.log(error);
  }
}
