import express from 'express';
import { DefunctionsCovidModel } from '../models/defunctionsCovidModel.js';

const defunctionsCovidRouter = express.Router();

defunctionsCovidRouter.get('/defunciones-por-covid', async (req, res) => {
    const defunctionsCovid = await DefunctionsCovidModel.find();
    res.send(defunctionsCovid);
});

export {defunctionsCovidRouter};
