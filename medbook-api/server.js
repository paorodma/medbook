'use strict';

require('dotenv').load();
console.log('loaded dotenv');

// Set default node environment to development
var env = process.env.NODE_ENV || 'development';

//grab packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

//Define app
var app = express();

//Configuration
//var config = require ('./config/environment/development');

//Routing
var userRouter = require('./routes/userRouting');
var patientRouter = require('./routes/patientRouting');
var doctorRouter = require('./routes/doctorRouting');
var dataRouter = require('./routes/dataRouting');

//Middleware

//CORS
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

app.use(express.static('medbook-front-end'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', userRouter);
app.use('/', patientRouter);
app.use('/', doctorRouter);
app.use('/data', dataRouter);

//Start Server

//Database
mongoose.connect(process.env.DB_URI);
console.log('mongoose URI' + process.env.DB_URI);

//Port
var port = process.env.PORT || 8080; 
console.log('Port:' + process.env.PORT);

app.listen(port);
console.log('Medbook API listening on port ' + port);