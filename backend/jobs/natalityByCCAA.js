// import cron from 'node-cron';
// import {CRON_TIME} from '../utils/constants.js';
import {getURL, getJSONContent} from '../boot/axios.js';
import {natalityDataToDB} from '../services/natalityByCCAAService.js';

// cron.schedule (CRON_TIME, () => {

// Llamamos a getURL que es una promesa
try {
  const datasetURL = await getURL('https://datos.gob.es/apidata/catalog/dataset/ea0010587-tasa-de-natalidad-por-comunidad-autonoma-segun-nacionalidad-espanola-extranjera-de-la-madre-idb-identificador-api-49429');
  const dataset = await getJSONContent(datasetURL);

  // Guardamos el dataset en un archivo JSON
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
    let tmpName = '';

    if (data.Nombre.match('Total Nacional') || data.Nombre.match('Española') || data.Nombre.match('Extranjera')) {
      return;
    }

    tmpName = data.Nombre.split('.')[1];
    tmpName = tmpName.trim();

    // Si tiene paréntesis
    if (tmpName.indexOf('(') > -1) {
      tmpName = tmpName.split('(')[1].replace(/[()]/g, '') + ' ' + tmpName.split('(')[0];
      tmpName = tmpName.trim();
    }

    data.Data.forEach( (data) => {
      tmpValues.push({
        interval: data.Anyo,
        value: data.Valor,
      });
    });

    finalDataset.push({
      id: index,
      ccaa: tmpName,
      values: tmpValues,
    });

    index++;
  });

  return finalDataset;
}

