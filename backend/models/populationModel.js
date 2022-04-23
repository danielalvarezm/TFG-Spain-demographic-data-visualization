import mongoose from 'mongoose';

const PopulationSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    ccaa: { type: String, required: true },
    male_values: [{
        interval: { type: Number, required: true },
        value: { type: Number, required: true }
    }], 
    female_values: [{
        interval: { type: Number, required: true },
        value: { type: Number, required: true }
    }],
    total_values: [{
        interval: { type: Number, required: true },
        value: { type: Number, required: true }
    }],
});

const PopulationModel = mongoose.model('Population', PopulationSchema, 'population')

export {PopulationModel}