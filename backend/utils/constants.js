import { DefunctionsCovidModel } from "../models/defunctionsCovidModel.js";
import { PopulationModel } from "../models/populationModel.js";

// Crontab constants
export const CRON_TIME = '* * * * *';
export const CRON_TIME_MONTH = '0 0 1 * *';
export const CRON_TIME_YEAR = '0 0 1 1 *';

// Database constants
export const COVID_TABLE_NAME = 'defunctions_covid';
export const POPULATION_TABLE_NAME = 'population';

export const database_models = {
    [COVID_TABLE_NAME]: DefunctionsCovidModel,
    [POPULATION_TABLE_NAME]: PopulationModel
};

/*
    * const table_name = 'defunctions_covid';
    * database_models[table_name]
*/
