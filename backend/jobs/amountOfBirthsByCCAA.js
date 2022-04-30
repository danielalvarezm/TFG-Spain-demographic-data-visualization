import { getNatalityData } from "../services/natalityByCCAAService";
import { getPopulationData } from "../services/populationByCCAAService";

const finalDataset = getAmountOfBirthByCCAA();




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
function getAmountOfBirthByCCAA() {
  const natalityData = getNatalityData();
  const populationData = getPopulationData();

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

      values.push({
        interval: year,
        value: (natality * population) / 1000
      });
    }

    finalDataset.push({
      id: i,
      ccaa: ccaa,
      values: values
    });
  }

  return finalDataset;
}


