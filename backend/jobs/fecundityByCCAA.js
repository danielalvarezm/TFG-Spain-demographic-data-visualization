import {getURL, getJSONContent} from '../boot/axios.js';
import {fecundityDataToDB} from '../services/fecundityByCCAAService.js';

export async function fecundityFetchData() {
  try {
    const datasetURL = await getURL('https://datos.gob.es/apidata/catalog/dataset/ea0010587-indicador-coyuntural-de-fecundidad-por-comunidad-autonoma-segun-orden-del-nacimiento-y-nacionalidad-espanola-extranjera-de-la-madre-idb-identificador-api-1441');
    const dataset = await getJSONContent(datasetURL);
    const finalDataset = processDataset(dataset);
    await fecundityDataToDB(finalDataset);

    console.log('Dataset saved: fecundity');
  } catch (error) {
    console.log(error);
  }
}

function processDataset(dataset) {
  const finalDataset = [];
  let index = 0;

  dataset.forEach( (data) => {
    const tmpValues = [];

    if (data.Nombre.match('Total Nacional') || data.Nombre.match('Española') || data.Nombre.match('Extranjera') ||
    data.Nombre.match('Primero.') || data.Nombre.match('Segundo.') || data.Nombre.match('Tercero.') || data.Nombre.match('Cuarto y más.')) {
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
