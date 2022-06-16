import express from 'express';
import {InfantMortalityRateModel} from '../models/infantMortalityRateModel.js';

const infantMortalityRateRouter = express.Router();

infantMortalityRateRouter.get('/tasa-de-mortalidad-infantil', async (req, res) => {
  const infantMortalityRate = await InfantMortalityRateModel.find();
  res.send(infantMortalityRate);
});

export {infantMortalityRateRouter};
