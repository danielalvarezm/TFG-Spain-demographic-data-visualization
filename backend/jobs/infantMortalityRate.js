/* eslint-disable indent */
// import cron from 'node-cron';
import {getURL, getJSONContent} from '../boot/axios.js';
import {infantMortalityRateDataToDB} from '../services/infantMortalityRateService.js';

// cron.schedule('* 8 * * * *', async () => {
export async function infantMortalityFetchData() {
  try {
    const datasetURL = await getURL(
      'https://datos.gob.es/apidata/catalog/dataset/ea0010587-tasa-de-mortalidad-infantil-por-provincia-segun-sexo-idb-identificador-api-48881'
    );
    const dataset = await getJSONContent(datasetURL);
    const finalDataset = processDataset(dataset);
    await infantMortalityRateDataToDB(finalDataset);

    console.log('Dataset saved: infant mortality rate');
  } catch (error) {
    console.log(error);
  }
}

// });

function processDataset(dataset) {
  /*
  * 0 = Total
  * 1 = Hombre
  * 2 = Mujer
  */
  const onlyDataAtNationalLevel = dataset.slice(0, 3);
  const dataSize = onlyDataAtNationalLevel[0].Data.length; // El tamaño es el mismo para cualquier dataset (homnbre mujer total)
  const finalDataset = [];

  for (let i = 0; i < dataSize; i++) {
    const totalValue = onlyDataAtNationalLevel[0].Data[i].Valor;
    const maleValue = onlyDataAtNationalLevel[1].Data[i].Valor;
    const femaleValue = onlyDataAtNationalLevel[2].Data[i].Valor;
    const year = onlyDataAtNationalLevel[0].Data[i].Anyo;

    finalDataset.push({
      id: i,
      year: year,
      total_value: totalValue,
      male_value: maleValue,
      female_value: femaleValue,
    });
  }

  return finalDataset;
}
