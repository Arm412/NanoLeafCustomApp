const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
let ip = require('ip');
const axios = require('axios');
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

app.get('/getNanoLeafData', (req, res) => {
	let returnedData = {};
	axios
    .get(process.env.NANOLEAF_IP + '/api/v1/' + process.env.NANO_TOKEN + '/effects/effectsList', {
        withCredentials: true
    }).then((response) => {
		returnedData = response.data;
		console.log(returnedData);
		res.send(returnedData);
    }).catch((message) => {
		console.log(message);
	});
});

app.post('/getCurrentEffect', (req, res) => {
	var data = '{"brightness" : {"value":90, "duration":1}}';

	var config = {
  		method: 'put',
  		url: process.env.NANOLEAF_IP + '/api/v1/' + process.env.NANO_TOKEN + '/state',
  		headers: { },
  		data : data
	};

	axios(config)
	.then((response) => {
		console.log("Success")
  		console.log(JSON.stringify(response.data));
	})
	.catch((error) => {
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
