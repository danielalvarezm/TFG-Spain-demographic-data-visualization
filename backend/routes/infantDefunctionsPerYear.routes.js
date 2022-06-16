import express from 'express';
import {InfantDefunctionsPerYearModel} from '../models/infantDefunctionsPerYearModel.js';

const infantDefunctionsPerYearRouter = express.Router();

infantDefunctionsPerYearRouter.get('/defunciones-infantiles', async (req, res) => {
  const infantDefunctionsPerYear = await InfantDefunctionsPerYearModel.find();
  res.send(infantDefunctionsPerYear);
});

export {infantDefunctionsPerYearRouter};
