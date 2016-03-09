'use strict';
// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//grab packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

//Define app
var app = express();

//Configuration
var config = require ('./config/environment/development');

//Routing
var doctorRouter = require('./routes/doctorRouting');
var patientRouter = require('./routes/patientRouting');
var dataRouter = require('./routes/dataRouting');
var userRouter = require('./routes/userRouting');

//Database
mongoose.connect(config.db_uri);

//Authentication Configuration
//app.set('superSecret', config.secret); 

//TODO: Use configuration
var port = process.env.PORT || 3000; 

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

app.use('/', doctorRouter);
app.use('/', patientRouter);
app.use('/data', dataRouter);
app.use('/', userRouter);

//Start Server
app.listen(port);
console.log('Medbook API listening on port ' + port);