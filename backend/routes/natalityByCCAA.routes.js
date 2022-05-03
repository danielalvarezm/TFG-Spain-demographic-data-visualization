import express from 'express';
import {NatalityModel} from '../models/natalityByCCAAModel.js';

const natalityRouter = express.Router();

natalityRouter.get('/natalidad', async (req, res) => {
  const natality = await NatalityModel.find();
  res.send(natality);
});

export {natalityRouter};
