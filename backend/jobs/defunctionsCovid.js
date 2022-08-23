import cron from 'node-cron';
import {CRON_TIME} from '../utils/constants.js';
import {getURL, getJSONContent} from '../boot/axios.js';
import {defunctionsCovidDataToDB} from '../services/defunctionsCovidService.js';

cron.schedule(CRON_TIME, async () => {
// Llamamos a getURL que es una promesa
  try {
    const datasetURL = await getURL(
      'https://datos.gob.es/apidata/catalog/dataset/ea0010587-defunciones-por-covid-19-virus-identificado-y-virus-no-identificado-sospechoso-comunidad-y-ciudad-autonoma-de-defuncion-sexo-y-edad-ecm-identificador-api-t15-p417-a2020-covid-l0-01004-px',
    );
    const dataset = await getJSONContent(datasetURL);
    const finalDataset = processDataset(dataset);
    await defunctionsCovidDataToDB(finalDataset);

    console.log('Dataset saved: defunctionsCovid');
  } catch (error) {
    console.log(error);
  }
});

function processDataset(dataset) {
  const maleDataset = [];
  const femaleDataset = [];
  const finalDataset = [];
  let index = 0;

  // Recorremos el array de defunciones por covid
  dataset.forEach((data) => {
    let tmpAge = '';
    let tmpValue = 0;

    if (data.Nombre.match('Total nacional, Total')) {
      tmpAge = data.Nombre.split(',')[3];
      tmpValue = data.Data[0].Valor;
      tmpAge = tmpAge.trim();

      if (data.Nombre.match('Total nacional, Total, Hombre')) {
        // Si es hombre
        maleDataset.push({
          age: tmpAge,
          value: tmpValue,
        });
      } else if (data.Nombre.match('Total nacional, Total, Mujer')) {
        // Si es mujer
        femaleDataset.push({
          age: tmpAge,
          value: tmpValue,
        });
      } else return;
    } else return;
  });

  const maleLength = maleDataset.length;

  for (let i = 0; i < maleLength; i++) {
    finalDataset.push({
      id: index,
      age: maleDataset[i].age,
      male_values: maleDataset[i].value,
      female_values: femaleDataset[i].value,
      total_values: maleDataset[i].value + femaleDataset[i].value,
    });

    index++;
  }

  return finalDataset;
}
