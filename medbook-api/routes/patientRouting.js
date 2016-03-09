'use strict';
var router = require('express').Router();
var patients = require('./../controllers/patientController');
var Logger = require('./../controllers/ErrorController');

router.use(function(req, res, next){
	Logger.log(req, "D", "patientRouting.js");
	next();
})

router.route('/patients')
  .get(function(req, res){
  	console.log('get all patients - should only be accessed through admin rights');
    patients.GetAll(req, res);
  });

router.route('/patients/:patient_id')
 .get(function(req, res){
 	patients.GetProfile(req, res);
 })

router.route('/patients')
 .post(function(req, res){
 	patients.SignUp(req, res);
 })

router.route('/patients/:patient_id')
 .delete(function(req, res){
 	patients.Remove(req, res);
 })

router.route('/patients/:patient_id')
 .put(function(req, res){
 	patients.UpdateProfile(req, res);
 })

module.exports = router;