import cron from 'node-cron';

import {natalityFetchData} from './natalityByCCAA.js';
import {populationFetchData} from './populationByCCAA.js';
import {amountOfBirthsFetchData} from './amountOfBirthsByCCAA.js';
import {infantMortalityFetchData} from './infantMortalityRate.js';
import {fecundityFetchData} from './fecundityByCCAA.js';
import {infantDefunctionsFetchData} from './infantDefunctionsPerYear.js';

cron.schedule('0 0 12 * * 4', async () => {
  try {
    await populationFetchData();
  } catch (error) {
    console.log(error);
  }
});

cron.schedule('0 0 12 9 12 *', async () => {
  try {
    await natalityFetchData();
    await infantMortalityFetchData();
    await fecundityFetchData();
  } catch (error) {
    console.log(error);
  }
});

cron.schedule('0 10 12 9 12 *', async () => {
  try {
    await amountOfBirthsFetchData();
  } catch (error) {
    console.log(error);
  }
});

cron.schedule('0 20 12 9 12 *', async () => {
  try {
    await infantDefunctionsFetchData();
  } catch (error) {
    console.log(error);
  }
});

