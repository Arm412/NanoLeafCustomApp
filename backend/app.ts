//const express = require('express');
import express from 'express';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import ip from 'ip';
import axios, { AxiosRequestConfig } from 'axios';
const session = require('express-session');
const MongoStore = require('connect-mongo');
import {
  updateEffectsList,
  deleteEffectsList,
  getStoredEffects
} from './helpers/dbHelpers';
import { fetchEffectsList } from './helpers/leafHelpers';

dotenv.config();

const router = express.Router();
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'react-client', 'build')));

const dbString = 'mongodb://127.0.0.1:27017/NanoleafDB';

app.use(express.json());
app.use(cookieParser());

app.get('/getNanoLeafData', async (req: Request, res: Response) => {
  res.send(await getStoredEffects());
});

// Sends command to update the current effect
app.post('/setCurrentEffect', (req: Request, res: Response) => {
  console.log(req.body.effect);
  let chosenEffect = req.body.effect;
  var data = '{"select" : "' + chosenEffect + '"}';

  var config: AxiosRequestConfig = {
    method: 'put',
    url:
      process.env.NANOLEAF_IP +
      '/api/v1/' +
      process.env.NANO_TOKEN +
      '/effects',
    headers: {},
    data: data
  };

  axios(config)
    .then((response: any) => {
      console.log('Success');
      console.log(JSON.stringify(response.data));
    })
    .catch((error: string) => {
      console.log(error);
    });
});

// Updates the effects stored in the db
app.post('/updateEffectsList', async (req: Request, res: Response) => {
  // Call function to get list of Nanoleaf effects
  const retrievedEffectList: Array<String> = (await fetchEffectsList()) || [];
  await deleteEffectsList();
  await updateEffectsList(retrievedEffectList);
});

const PORT = process.env.PORT || 80;

app.listen(PORT, async () => {
  console.log(ip.address());
  console.log('Listening on Port: ' + PORT);
});
