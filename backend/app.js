/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
// Boot components
import './boot/axios.js';
import {mongoose} from './boot/database.js';
import * as dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// import './routes/routes.js'; // Importamos las rutas
import {amountOfBirthsRouter} from './routes/amountOfBirthsByCCAA.routes.js';
import {defunctionsCovidRouter} from './routes/defunctionsCovid.routes.js';
import {fecundityRouter} from './routes/fecundityByCCAA.routes.js';
import {infantDefunctionsPerYearRouter} from './routes/infantDefunctionsPerYear.routes.js';
import {infantMortalityRateRouter} from './routes/infantMortalityRate.routes.js';
import {populationRouter} from './routes/populationByCCAA.routes.js';
import {natalityRouter} from './routes/natalityByCCAA.routes.js';

app.use('/', amountOfBirthsRouter);
app.use('/', defunctionsCovidRouter);
app.use('/', fecundityRouter);
app.use('/', infantDefunctionsPerYearRouter);
app.use('/', infantMortalityRateRouter);
app.use('/', populationRouter);
app.use('/', natalityRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

import './jobs/cron.js';

export {app};
