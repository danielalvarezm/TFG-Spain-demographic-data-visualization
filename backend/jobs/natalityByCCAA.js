// import cron from 'node-cron';
// import {CRON_TIME} from '../utils/constants.js';
import {getURL, getJSONContent} from '../boot/axios.js';
import {natalityDataToDB} from '../services/natalityByCCAAService.js';

// cron.schedule (CRON_TIME, () => {

// Llamamos a getURL que es una promesa
try {
  const datasetURL = await getURL('https://datos.gob.es/apidata/catalog/dataset/ea0010587-tasa-de-natalidad-por-comunidad-autonoma-segun-nacionalidad-espanola-extranjera-de-la-madre-idb-identificador-api-49429');
  const dataset = await getJSONContent(datasetURL);
  const finalDataset = processDataset(dataset);
  await natalityDataToDB(finalDataset);

  console.log('Dataset saved: natality');
} catch (error) {
  console.log(error);
  // return error;
}

// });

function processDataset(dataset) {
  const finalDataset = [];
  let index = 0;

  dataset.forEach( (data) => {
    const tmpValues = [];

    if (data.Nombre.match('Total Nacional') || data.Nombre.match('Española') || data.Nombre.match('Extranjera')) {
      return;
    }

    const nameSplitted = data.Nombre.split('.')[1];
    let ccaaName = nameSplitted.trim();

    // Si tiene paréntesis
    if (ccaaName.indexOf('(') > -1) {
      ccaaName = ccaaName.split('(')[1].replace(/[()]/g, '') + ' ' + ccaaName.split('(')[0];
      ccaaName = ccaaName.trim();
    }

    data.Data.forEach( (data) => {
      tmpValues.push({
        interval: data.Anyo,
        value: data.Valor,
      });
    });

    finalDataset.push({
      id: index,
      ccaa: ccaaName,
      values: tmpValues,
    });

    index++;
  });

  return finalDataset;
}

