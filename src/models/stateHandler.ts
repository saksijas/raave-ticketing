import * as dotenv from "dotenv";
import mongoose from 'mongoose';
dotenv.config();

export interface IState{
  ensDomain: string;
  lastChecked: number;
}

const voterSchema = new mongoose.Schema({
    ensDomain: {
      type: String,
      required: true
    },
    lastChecked: {
      type: Number,
      required: true
    }
});

export const State = mongoose.model('State',voterSchema);

export const build = (attribute: IState) => {
  return new State(attribute);
}