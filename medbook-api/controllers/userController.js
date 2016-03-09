'use strict';
var Model = require('./../models/userModel');

var patient = require('./../controllers/patientController'); 
var doctor = require('./../controllers/doctorController'); 
var Logger = require('./../controllers/errorController');

var jwt = require('jsonwebtoken');
var config = require ('./../config/environment/development');

function Authenticate(req, res){
	Model.findOne({
    	email: req.body.email
  	}, function(err, user) {

    	if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } 
	    else if (user) {
	      	// check if password matches
	      	if (user.password != req.body.password) {
	        	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      	} 
	      	else {
		      	var token = jwt.sign(user, config.secret, {
		          expiresInMinutes: 1440 // expires in 24 hours
		        });

		        // return the information including token as JSON
	    	    res.json({
	        	  success: true,
	          	  message: 'Enjoy your token!',
	              token: token
	        	});
			}
		}
	}
)}

function GetAll(req, res){
	console.log('userController.GetAll');
	Model.find().then(function(results){
		res.send(results);
	});
}

/*function GetOne(req, res){
	console.log('doctorController.GetOne: ' + req.params.doctor_id);
	Model.findById(req.params.doctor_id)
		.then(function(results){
			res.send(results);
		})
		.catch(function(err){
			Logger.log(err, "E", "doctorController.GetOne");
			res.send(err);
		});
}
*/
function New(req, res){
	console.log('userController.New');

/*	var usr = new Model();
	usr.name = req.body.name;
	usr.lastName =  req.body.lastName;
	usr.email =  req.body.email;
	usr.password = req.body.password;
	usr.isPatient = req.body.isPatient;
	usr.isAdmin = req.body.isAdmin;*/

	var usr = new Model();
	usr.name = 'Paola';
	usr.lastName =  'Rodriguez';
	usr.email =  'pao.rodriguez@gmail.com';
	usr.password = 'paolita';
	usr.isAdmin = true;
	usr.isPatient = true;
  	  	
	usr.save()
	.then(function(usr){
		if (usr.isPatient){
			patient.New(usr.id);
		}
		else{
			doctor.New(usr.id);
		}
		return usr;
	})
	.then(function(usr){
		console.log('segunda promesa');
		console.log(usr);
		res.send(usr);
	})
	.catch(function(err){
		Logger.log(err, "E", "userController.New");
		res.send(err);
	})
}

/*
function Update(req, res){
	console.log('doctorController.Update: ' + req.params.doctor_id);

	Model.findByIdAndUpdate(req.params.doctor_id, req.body).then(function(results) {
	  console.log('Updated doctor');
	  res.send(results);
	}).catch(function(err){
		console.log(err);
		res.send(err);
	});
}

function Delete(req, res){
	console.log('doctorController.Delete: ' + req.params.doctor_id);
	Model.findByIdAndRemove(req.params.doctor_id).then(function(results) {
	  res.send(results);
	}).catch(function(err){
		console.log(err);
		res.send(err);
	});
}*/

module.exports = {
	Authenticate: Authenticate,
	GetAll:GetAll, 
	////GetProfile:GetOne, 
	SignUp:New
	//UpdateProfile: Update,
	//Remove: Delete
}
