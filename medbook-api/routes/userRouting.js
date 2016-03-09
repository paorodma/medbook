'use strict';
var userRouter = require('express').Router();

var user = require('./../controllers/userController');
var Logger = require('./../controllers/ErrorController');

//Middleware
userRouter.use(function(req, res, next){
	Logger.log(req, "D", "userRouting.js");
	next();
})

//Routes
userRouter.get('/api/authenticate', function(req, res){
  	console.log('Authenticate');
});

userRouter.get('/api', function(req, res) {
    res.send('Hello! The API is at http://localhost:3000/api');
});

userRouter.get('/setup', function(req, res) {
	user.SignUp(req, res);
});

userRouter.get('/users', function(req, res) {
	user.GetAll(req, res);
});

userRouter.post('/authenticate', function(req, res) {
	user.Authenticate(req, res);
});

module.exports = userRouter;