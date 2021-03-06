import express, { Request, Response } from 'express';
import * as bodyParser from "body-parser";
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import schedule from 'node-schedule';
import { raaveNotification } from './services/epns.service';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;
const ensDomain = process.env.ENS_DOMAIN;
mongoose.connect(process.env.DB_URI as string);



schedule.scheduleJob("*/30 * * * * *", async() => {
  await raaveNotification();
});


app.get('/', async (req: Request, res: Response) => {
  res.send(200);
});

app.listen(port, async () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});