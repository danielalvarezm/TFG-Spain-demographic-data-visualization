import './amountOfBirthsByCCAA.js';
import {getInfantMortalityRateData} from '../services/infantMortalityRateService.js';
import {getAmountOfBirthsData} from '../services/amountOfBirthsByCCAAService.js';
import {infantDefunctionsPerYearDataToDB} from '../services/infantDefunctionsPerYearService.js';

const infantMortalityRateData = await getInfantMortalityRateData();
const amountOfBirthsData = await getAmountOfBirthsData();
const amountOfBirthsAtNationalLevel = transformToNationalLevel(amountOfBirthsData);
const finalDataset = generateInfantDefunctionsPerYear(
  infantMortalityRateData, amountOfBirthsAtNationalLevel);

await infantDefunctionsPerYearDataToDB(finalDataset);
console.log('Dataset saved: infant defunctions per year');
// TODO: hacerlo tmb por comunidad autonoma
function transformToNationalLevel(amountOfBirthsData) {
  const amountOfBirthsAtNationalLevel = [];
  for (let i = 0; i < amountOfBirthsData[0].values.length; i++) {
    let amountPerYear = 0;

    for (let j = 0; j < amountOfBirthsData.length; j++) {
      amountPerYear += amountOfBirthsData[j].values[i].value;
    }

    amountOfBirthsAtNationalLevel.push({
      interval: amountOfBirthsData[0].values[i].interval,
      value: amountPerYear,
    });
  }
  return amountOfBirthsAtNationalLevel;
}

function generateInfantDefunctionsPerYear(infantMortalityRateData, amountOfBirthsAtNationalLevel) {
  const finalDataset = [];
  for (let i = 0; i < amountOfBirthsAtNationalLevel.length; i++) {
    const value = (amountOfBirthsAtNationalLevel[i].value *
      infantMortalityRateData[i].total_value)/1000;
    finalDataset.push({
      id: i,
      interval: amountOfBirthsAtNationalLevel[i].interval,
      value: parseInt(value * 1000, 10) / 1000,
    });
  }
  return finalDataset;
}
