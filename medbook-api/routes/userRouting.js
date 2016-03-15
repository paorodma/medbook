'use strict';
var userRouter = require('express').Router();

var user = require('./../controllers/userController');
var Logger = require('./../controllers/ErrorController');

//Middleware
userRouter.use(function(req, res, next){
	Logger.log(req, "D", "userRouting.js");
	next();
})

//Unprotected Routes
userRouter.post('/signUp', function(req, res) {
	user.SignUp(req, res);
});

userRouter.post('/authenticate', function(req, res) {
	console.log('Authenticate');
	user.Authenticate(req, res);
});

//Protected routes

//Middleware to check token
userRouter.use(function(req, res, next) {
	user.ValidateToken(req, res, next);
});


userRouter.get('/api', function(req, res) {
    res.send('Hello! The API is at http://localhost:3000/api');
});

userRouter.get('/users', function(req, res) {
	user.GetAll(req, res);
});

module.exports = userRouter;