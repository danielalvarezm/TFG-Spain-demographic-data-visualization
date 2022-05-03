import cron from "node-cron";
import { CRON_TIME } from "../utils/constants.js";
import { getURL, getJSONContent } from "../boot/axios.js";

try {
  const datasetURL = await getURL(
    "https://datos.gob.es/apidata/catalog/dataset/ea0010587-tasa-de-mortalidad-infantil-por-provincia-segun-sexo-idb-identificador-api-48881"
  );
  const dataset = await getJSONContent(datasetURL);

  // Guardamos el dataset en un archivo JSON
  let finalDataset = processDataset(dataset);

  console.log(finalDataset);
  // await
  console.log("Dataset saved: infant mortality rate");
} catch (error) {
  console.log(error);
}

function processDataset(dataset) {
  /*
  * 0 = Total
  * 1 = Hombre
  * 2 = Mujer
  */
  const onlyDataAtNationalLevel = dataset.slice(0, 3);
  const dataSize = onlyDataAtNationalLevel[0].Data.length; // El tamaño es el mismo para cualquier dataset (homnbre mujer total)
  let finalDataset = [];

  for (let i = 0; i < dataSize; i++) {
    const totalValue = onlyDataAtNationalLevel[0].Data[i].Valor;
    const maleValue = onlyDataAtNationalLevel[1].Data[i].Valor;
    const femaleValue = onlyDataAtNationalLevel[2].Data[i].Valor;
    const year = onlyDataAtNationalLevel[0].Data[i].Anyo;

    finalDataset.push({
      id: i,
      year: year,
      total: totalValue,
      male: maleValue,
      female: femaleValue,
    });
  }

  return finalDataset;
}
