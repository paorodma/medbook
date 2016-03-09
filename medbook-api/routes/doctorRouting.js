/*
--ui-router
angular.module('trackerTestApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('results', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      });
  });
*/

'use strict';
var router = require('express').Router();
var doctors = require('./../controllers/doctorController');
var Logger = require('./../controllers/ErrorController');

router.use(function(req, res, next){
	Logger.log(req, "D", "doctorRouting.js");
	next();
})

router.route('/doctors')
  .get(function(req, res){
  	console.log('get all doctors - should only be accessed through admin rights');
    doctors.GetAll(req, res);
  });

router.route('/doctors/:doctor_id')
 .get(function(req, res){
 	doctors.GetProfile(req, res);
 })

router.route('/doctors')
 .post(function(req, res){
 	doctors.SignUp(req, res);
 })

router.route('/doctors/:doctor_id')
 .delete(function(req, res){
 	doctors.Remove(req, res);
 })

router.route('/doctors/:doctor_id')
 .put(function(req, res){
 	doctors.UpdateProfile(req, res);
 })

module.exports = router;