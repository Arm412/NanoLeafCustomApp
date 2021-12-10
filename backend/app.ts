//const express = require('express');
import express from 'express';
import {Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import ip from 'ip';
import axios, { AxiosRequestConfig } from 'axios';

dotenv.config();

const router = express.Router();
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'react-client', 'build')));

const dbString = 'mongodb://127.0.0.1:27017/';

// try {
// 	// app.use(
// 		// session({
// 		// 	key: 'sessionID',
// 		// 	secret: process.env.MONGO_SECRET,
// 		// 	resave: false,
// 		// 	saveUninitialized: false,
// 		// 	cookie: {
// 		// 		httpOnly: true,
// 		// 		maxAge: parseInt(process.env.SESSION_MAX_AGE),
// 		// 		secure: false,
// 		// 	},
// 		// 	store: MongoStore.create({
// 		// 		mongoUrl: dbString,
// 		// 		collectionName: 'nanoleaf',
// 		// 	}),
// 		// })
// 	// );
// } catch (err) {
// 	console.log('There was a problem creating the session store.');
// 	console.log(err);
// }

app.use(express.json());
app.use(cookieParser());

app.get('/getNanoLeafData', (req: Request, res: Response) => {
	let returnedData = {};
	axios
    .get(process.env.NANOLEAF_IP + '/api/v1/' + process.env.NANO_TOKEN + '/effects/effectsList', {
        withCredentials: true
    }).then((response: any) => {
		returnedData = response.data;
		res.send(returnedData);
    }).catch((message: String) => {
		console.log(message);
	});
});

app.post('/setCurrentEffect', (req, res) => {
	console.log(req.body.effect);
	let chosenEffect = req.body.effect; 
	var data = '{"select" : "' + chosenEffect + '"}';

	var config: AxiosRequestConfig = {
  		method: 'put',
  		url: process.env.NANOLEAF_IP + '/api/v1/' + process.env.NANO_TOKEN + '/effects',
  		headers: { },
  		data : data
	};

	axios(config)
	.then((response: any) => {
		console.log("Success")
  		console.log(JSON.stringify(response.data));
	})
	.catch((error: string) => {
  		console.log(error);
	});
});

app.get('*', (req, res) => {
	//res.sendFile(path.join(__dirname, '..', 'frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
	console.log(ip.address());
	console.log('Listening on Port: ' + PORT);
});
