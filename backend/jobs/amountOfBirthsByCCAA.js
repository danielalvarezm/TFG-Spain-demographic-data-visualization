import cron from 'node-cron';
import { CRON_TIME } from '../utils/constants.js';
import { getNatalityData } from "../services/natalityByCCAAService.js";
import { getPopulationData } from "../services/populationByCCAAService.js";
import { amountOfBirthsDataToDB } from '../services/amountOfBirthsByCCAAService.js';

const natalityData = await getNatalityData();
const populationData = await getPopulationData();
let finalDataset = [];

for (let i = 0; i < natalityData.length; i++) {
  const ccaa = natalityData[i].ccaa;
  const natalities = natalityData[i].values;
  let populations = populationData[i].total_values;
  populations.shift();

  let values = [];
  for (let j = 0; j < natalities.length; j++) {
    const year = natalities[j].interval;
    const natality = natalities[j].value;
    const population = populations[j].value;
    const amountOfBirths = (natality * population) /1000;


    values.push({
      interval: year,
      value: parseInt(amountOfBirths * 1000, 10) / 1000,  // redondear a 3 decimales
    });

  }

  finalDataset.push({
    id: i,
    ccaa: ccaa,
    values: values
  });
}

await amountOfBirthsDataToDB(finalDataset);
console.log("Dataset saved: amount of births by CCAA");




// Año 2020
// Andalucía
// Tasa natalidad: 7.72%
// * Total: 8483769
// * Mujer: 4298591
// * Hombre: 4185178
// Calculo (natality * population) / 1000
// * Total -> (8483769 * 7.72) / 1000 = 65494,69668
// * Hombre -> (4298591 * 7.72) / 1000 = 33185,12252
// * Mujer -> (4185178 * 7.72) / 1000 = 32309,57416

// Between 2002 and 2020
// amountOfBirthsByCCAA = (natality * population) / 1000





