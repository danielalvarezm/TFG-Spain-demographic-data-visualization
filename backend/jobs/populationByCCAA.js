import cron from 'node-cron';
import {CRON_TIME_YEAR} from '../utils/constants.js';
import {getURL, getJSONContent} from '../boot/axios.js';
import {populationDataToDB} from '../services/populationByCCAAService.js';

cron.schedule(CRON_TIME_YEAR, async () => {
  try {
    const datasetURL = await getURL('https://datos.gob.es/apidata/catalog/dataset/ea0010587-poblacion-residente-por-fecha-sexo-y-generacion-edad-a-31-de-diciembre-semestral-comunidades-autonomas-cifras-de-poblacion-identificador-api-96821');
    const dataset = await getJSONContent(datasetURL);
    const finalDataset = processDataset(dataset);
    await populationDataToDB(finalDataset);

    console.log('Dataset saved: population');
  } catch (error) {
    console.log(error);
  }
});

function processDataset(dataset) {
  const maleDataset = [];
  const femaleDataset = [];
  const finalDataset = [];
  let index = 0;

  // Recorremos el array de población
  dataset.forEach( (data) => {
    let object = {name: '', values: []};
    let ccaaName = '';

    if (data.Nombre.match('Total Nacional')) return;
    else if (data.Nombre.match('Todas las edades.') && data.Nombre.match('Población. Número. ')) {
      ccaaName = data.Nombre.split('.')[1];
      if (ccaaName.match(',')) {
        ccaaName = ccaaName.split(',')[1] + ccaaName.split(',')[0];
      }

      ccaaName = ccaaName.trim();

      if (!data.Nombre.match('Total')) {
        // Obtenemos los values según el año
        object = {
          name: ccaaName,
          values: [],
        };

        data.Data.forEach( (data) => {
          if (data.T3_Periodo == '1 de enero de') {
            object.values.push({
              interval: data.Anyo,
              value: data.Valor,
            });
          }
        });
      }
      if (data.Nombre.match('Hombre')) { // Si es hombre
        maleDataset.push(object);
      } else if (data.Nombre.match('Mujer')) { // Si es mujer
        femaleDataset.push(object);
      } else return;
    } else return;
  });

  const maleLength = maleDataset.length;

  for (let i = 0; i < maleLength; i++) {
    const tmpTotalValues = [];
    let count = 0;

    maleDataset[i].values.forEach( (data) => {
      tmpTotalValues.push({
        interval: data.interval,
        value: data.value + femaleDataset[i].values[count].value,
      });
      count++;
    });

    finalDataset.push({
      id: index,
      ccaa: maleDataset[i].name,
      male_values: maleDataset[i].values,
      female_values: femaleDataset[i].values,
      total_values: tmpTotalValues,
    });

    index++;
  }

  return finalDataset;
}
