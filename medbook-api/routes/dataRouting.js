'use strict';
var dataRouter = require('express').Router();
var data = require('./../controllers/dataController');
var Logger = require('./../controllers/ErrorController');

dataRouter.use(function(req, res, next){
	Logger.log(req, "D", "dataRouting.js");
	next();
})

dataRouter.route('/bloodTypes')
  .get(function(req, res){
  	console.log('get all bloodTypes');
    data.GetBloodTypes(req, res);
  });

dataRouter.route('/labTests')
  .get(function(req, res){
  	data.GetLabTests(req, res);
  });


dataRouter.route('/medicalSpecialties')
  .get(function(req, res){
  	data.GetMedicalSpecialties(req, res);
  });


dataRouter.route('/drugs')
  .get(function(req, res){
  	data.GetDrugs(req, res);
  });

module.exports = dataRouter;