import cron from "node-cron";
import { CRON_TIME } from "../utils/constants.js";
import { getURL, getJSONContent } from "../boot/axios.js";
import { defunctionsCovidDataToDB } from "../services/defunctionsCovidService.js";

//cron.schedule (CRON_TIME, () => {
// Llamamos a getURL que es una promesa
try {
  const datasetURL = await getURL(
    "https://datos.gob.es/apidata/catalog/dataset/ea0010587-defunciones-por-covid-19-virus-identificado-y-virus-no-identificado-sospechoso-comunidad-y-ciudad-autonoma-de-defuncion-sexo-y-edad-ecm-identificador-api-t15-p417-a2020-covid-l0-01004-px"
  );
  const dataset = await getJSONContent(datasetURL);

  // Guardamos el dataset en un archivo JSON
  let final_dataset = processDataset(dataset);

  await defunctionsCovidDataToDB(final_dataset);
  console.log("Dataset saved: defunctionsCovid");
} catch (error) {
  console.log(error);
}
//});

function processDataset(dataset) {
  let male_dataset = [];
  let female_dataset = [];
  let final_dataset = [];
  let index = 0;

  // Recorremos el array de defunciones por covid
  dataset.forEach((data) => {
    let tmp_age = "";
    let tmp_value = 0;

    if (data.Nombre.match("Total nacional, Total")) {
      tmp_age = data.Nombre.split(",")[3];
      tmp_value = data.Data[0].Valor;
      tmp_age = tmp_age.trim();

      if (data.Nombre.match("Total nacional, Total, Hombre")) {
        // Si es hombre
        male_dataset.push({
          age: tmp_age,
          value: tmp_value,
        });
      } else if (data.Nombre.match("Total nacional, Total, Mujer")) {
        // Si es mujer
        female_dataset.push({
          age: tmp_age,
          value: tmp_value,
        });
      } else return;
    } else return;
  });

  let length_h = male_dataset.length;

  for (let i = 0; i < length_h; i++) {
    final_dataset.push({
      id: index,
      age: male_dataset[i].age,
      male_values: male_dataset[i].value,
      female_values: female_dataset[i].value,
      total_values: male_dataset[i].value + female_dataset[i].value,
    });

    index++;
  }

  return final_dataset;
}
