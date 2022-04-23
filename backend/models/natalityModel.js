import mongoose from 'mongoose';

const NatalitySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    ccaa: { type: String, required: true },
    values: [{
        interval: { type: Number, required: true },
        value: { type: Number, required: true }
    }],
});

const NatalityModel = mongoose.model('Natality', NatalitySchema, 'natality');

export {NatalityModel}
