import cron from 'node-cron';
import { CRON_TIME } from '../utils/constants.js';
import { getURL, getJSON } from '../boot/axios.js';
import { natalityDataToDB } from '../services/natalityService.js';

// ¿Ponerlo por covid identificado o no identificado?

//cron.schedule (CRON_TIME, () => {

	// Llamamos a getURL que es una promesa
	try {
		const datasetURL = await getURL('https://datos.gob.es/apidata/catalog/dataset/ea0010587-tasa-de-natalidad-por-comunidad-autonoma-segun-nacionalidad-espanola-extranjera-de-la-madre-idb-identificador-api-49429');
		const dataset = await getJSON(datasetURL);

		// Guardamos el dataset en un archivo JSON
		let final_dataset = processDataset(dataset);

		await natala(final_dataset);
		console.log('Natalidad');

	} catch (error) {
		console.log(error);
		//return error;
	}

//});

function processDataset (dataset) {
	let final_dataset = [];
	let index = 0;

	dataset.forEach( data => {
		let tmp_values = [];
		let tmp_name = '';

		if (data.Nombre.match("Total Nacional") || data.Nombre.match("Española") || data.Nombre.match("Extranjera"))
			return;

		tmp_name = data.Nombre.split('.')[1];
		tmp_name = tmp_name.trim();

		// Si tiene paréntesis
		if (tmp_name.indexOf('(') > -1) {
			tmp_name = tmp_name.split('(')[1].replace(/[()]/g, '') + ' ' + tmp_name.split('(')[0];
			tmp_name = tmp_name.trim();
		}

		data.Data.forEach( data => {
			tmp_values.push({
				interval: data.Anyo,
				value: data.Valor
			});
		});

		final_dataset.push({
			id: index,
			ccaa: tmp_name,
			values: tmp_values
		})

		index++;
	});

	return final_dataset;
}

