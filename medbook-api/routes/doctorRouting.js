'use strict';
var doctorRouter = require('express').Router();
var doctors = require('./../controllers/doctorController');
var Logger = require('./../controllers/errorController');
var user = require('./../controllers/userController');

doctorRouter.use(function(req, res, next){
	Logger.log(req, "D", "doctorRouting.js");
	next();
})

doctorRouter.route('/doctors')
 .post(function(req, res){
  doctors.SignUp(req, res);
 })

//Protected routes

//Middleware to check token
doctorRouter.use(function(req, res, next) {
  user.ValidateToken(req, res, next);
});

doctorRouter.route('/doctors')
  .get(function(req, res){
  	console.log('get all doctors - should only be accessed through admin rights');
    doctors.GetAll(req, res);
  });

doctorRouter.route('/doctors/:doctor_id')
 .get(function(req, res){
    console.log('doctors.GetProfile');
 	  doctors.GetProfile(req, res);
 });

 doctorRouter.route('/doctors/:doctor_id/appointments')
 .get(function(req, res){
    console.log('doctors.GetDoctorAppointments');
    doctors.GetDoctorAppointments(req, res);
 });

 doctorRouter.route('/doctors/:doctor_id/patients')
 .get(function(req, res){
    console.log('doctors.GetDoctorPatients');
    doctors.GetDoctorPatients(req, res);
 });

doctorRouter.route('/doctors/:doctor_id')
 .delete(function(req, res){
 	doctors.Remove(req, res);
 })

doctorRouter.route('/doctors/:doctor_id')
 .put(function(req, res){
 	doctors.UpdateProfile(req, res);
 })

module.exports = doctorRouter; 