//configuracion inicial de axios
import axios from 'axios';
import https from 'https';

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

console.log("Axios is ready");

async function getURL(url) {
	let dataset;

	await api.get(url)
		.then(function (response) {
			if (response.status === 200) {
				const distribution = response.data.result.items[0].distribution;

				for (const element of distribution) {
					if (element.format.value === 'application/json') {
						dataset = element.accessURL;
						return;
					}
				}
			}
			return dataset;
		}).catch(function (error) {
			console.log(error);
		});

	return dataset;
}

async function getJSONContent(url) {
	let data = {};

	await api.get(url)
		.then(function (response) {
			if (response.status === 200) {
				data = response.data;
				return data;
			}
		})
		.catch(function (error) {
			console.log(error);
			return error;
		}
	);
	return data;
}

export { api, getURL, getJSONContent };
