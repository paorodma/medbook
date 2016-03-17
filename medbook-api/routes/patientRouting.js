'use strict';
var patientRouter = require('express').Router();

var user = require('./../controllers/userController');
var patients = require('./../controllers/patientController');
var Logger = require('./../controllers/ErrorController');

patientRouter.use(function(req, res, next){
	Logger.log(req, "D", "patientRouting.js");
	next();
})

//Unprotected routes

patientRouter.route('/patients')
 .post(function(req, res){
 	patients.SignUp(req, res);
 })

//Protected routes

//Middleware to check token
patientRouter.use(function(req, res, next) {
	console.log('Calling ValidateToken');
	user.ValidateToken(req, res, next);
});

patientRouter.route('/patients')
  .get(function(req, res){
  	console.log('get all patients - should only be accessed through admin rights');
    patients.GetAll(req, res);
  });

patientRouter.route('/patients/:patient_id')
 .get(function(req, res){
 	console.log('patientRouter calling GetProfile');
 	patients.GetProfile(req, res);
 })

 patientRouter.route('/patients/:patient_id/personalInfo')
 .get(function(req, res){
 	console.log('patientRouter calling GetPersonalInformation');
 	patients.GetPersonalInformation(req, res);
 })

 patientRouter.route('/patients/:patient_id/doctors')
 .get(function(req, res){
 	console.log('patientRouter calling GetPatientDoctors');
 	patients.GetPatientDoctors(req, res);
 })

 patientRouter.route('/patients/:patient_id/appointments')
 .get(function(req, res){
 	console.log('patientRouter calling GetPatientAppointments');
 	patients.GetPatientAppointments(req, res);
 })

patientRouter.route('/patients/:patient_id')
 .delete(function(req, res){
 	patients.Remove(req, res);
 })

patientRouter.route('/patients/:patient_id')
 .put(function(req, res){
 	patients.UpdateProfile(req, res);
 })

module.exports = patientRouter;