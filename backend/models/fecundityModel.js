import mongoose from 'mongoose';

const FecunditySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    ccaa: { type: String, required: true },
    values: [{
        interval: { type: Number, required: true },
        value: { type: Number, required: true }
    }],
});

const FecundityModel = mongoose.model('Fecundity', FecunditySchema, 'fecundity');

export {FecundityModel}
