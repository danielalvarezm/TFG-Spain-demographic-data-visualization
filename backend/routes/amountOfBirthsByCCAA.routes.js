import express from 'express';
import {AmountOfBirthsModel} from '../models/amountOfBirthsByCCAAModel.js';

const amountOfBirthsRouter = express.Router();

amountOfBirthsRouter.get('/nacimientos', async (req, res) => {
  const amountOfBirths = await AmountOfBirthsModel.find();
  res.send(amountOfBirths);
});

export {amountOfBirthsRouter};
