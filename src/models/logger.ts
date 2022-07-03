
import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const logSchema = new Schema({
    error:{}

},{collection: 'Logs'});

export const Logger = mongoose.model('Logs',logSchema);
