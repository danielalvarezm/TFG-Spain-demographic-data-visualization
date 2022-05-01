//llamada y procesar
import cron from 'node-cron';
import { CRON_TIME } from '../utils/constants.js';
import { getURL, getJSONContent } from '../boot/axios.js';
import { populationDataToDB } from '../services/populationByCCAAService.js';

//cron.schedule (CRON_TIME, () => {

	// Llamamos a getURL que es una promesa
	try {
		const datasetURL = await getURL('https://datos.gob.es/apidata/catalog/dataset/ea0010587-poblacion-residente-por-fecha-sexo-y-generacion-edad-a-31-de-diciembre-semestral-comunidades-autonomas-cifras-de-poblacion-identificador-api-96821')
		const dataset = await getJSONContent(datasetURL)

    console.log(dataset);
		// Guardamos el dataset en un archivo JSON
		let final_dataset = processDataset(dataset);

		await populationDataToDB(final_dataset);
		console.log("Dataset saved: population");

	} catch (error) {
		console.log(error);

	}

//});

function processDataset (dataset) {
	let male_dataset = [];
	let female_dataset = [];
	let final_dataset = [];
	let index = 0;

	// Recorremos el array de población
	dataset.forEach( data => {
		let object = { name: '', values: [] };
		let tmp_name = '';

		if (data.Nombre.match("Total Nacional")) return;
		else if (data.Nombre.match("Todas las edades.") && data.Nombre.match("Población. Número. ")) {

			tmp_name = data.Nombre.split('.')[1];
			if (tmp_name.match(','))
				tmp_name = tmp_name.split(',')[1] + tmp_name.split(',')[0];

			tmp_name = tmp_name.trim();

			if (!data.Nombre.match('Total')) {
				// Obtenemos los values según el año
				object = {
					name: tmp_name,
					values: []
				};

				data.Data.forEach( data => {
					if (data.T3_Periodo == '1 de enero de') {
						object.values.push({
							interval: data.Anyo,
							value: data.Valor
						});
					}
				});
			}
			if (data.Nombre.match('Hombre'))  // Si es hombre
				male_dataset.push(object);

			else if (data.Nombre.match('Mujer'))  // Si es mujer
				female_dataset.push(object);

			else return;
		}
		else return;
	});

	let length_h = male_dataset.length;

	for (let i = 0; i < length_h; i++) {
		let tmp_total_values = [];
		let count = 0;

		male_dataset[i].values.forEach( data => {
			tmp_total_values.push({
				interval: data.interval,
				value: data.value + female_dataset[i].values[count].value
			});
			count++;
		});

		final_dataset.push({
			id: index,
			ccaa: male_dataset[i].name,
			male_values: male_dataset[i].values,
			female_values: female_dataset[i].values,
			total_values: tmp_total_values
		});

		index++;
	}

	return final_dataset;
}
