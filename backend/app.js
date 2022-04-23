// Boot components
import './boot/axios.js';
import {mongoose} from './boot/database.js';

// Modules imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Files imports
import './jobs/index.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// import './routes/routes.js'; // Importamos las rutas

import {populationRouter} from './routes/population.routes.js';
import {defunctionsCovidRouter} from './routes/defunctionsCovid.routes.js';
import {natalityRouter} from './routes/natality.routes.js';
import {fecundityRouter} from './routes/fecundity.routes.js';

app.use('/api', populationRouter);
app.use('/api', defunctionsCovidRouter);
app.use('/api', natalityRouter);
app.use('/api', fecundityRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

export {app};
