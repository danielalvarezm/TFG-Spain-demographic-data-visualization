import express from 'express';
import { PopulationModel } from '../models/populationByCCAAModel.js';

const populationRouter = express.Router();

populationRouter.get('/poblacion', async (req, res) => {
    const population = await PopulationModel.find();
    res.send(population);
});

export {populationRouter};
