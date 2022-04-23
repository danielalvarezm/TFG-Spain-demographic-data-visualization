import express from 'express';
import { FecundityModel } from '../models/fecundityModel.js';

const fecundityRouter = express.Router();

fecundityRouter.get('/fecundidad', async (req, res) => {
    const fecundity = await FecundityModel.find();
    res.send(fecundity);
});

export {fecundityRouter};
