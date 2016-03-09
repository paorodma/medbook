'use strict';
var Model = require('./../models/patientModel');
var Logger = require('./../controllers/errorController');

function GetAll(req, res){
	console.log('patientController.GetAll');
	Model.find().then(function(results){
		res.send(results);
	});
}

function GetOne(req, res){
	console.log('patientController.GetOne: ' + req.params.patient_id);
	Model.findById(req.params.patient_id)
		.then(function(results){
			res.send(results);
		})
		.catch(function(err){
			Logger.log(err, "E", "patientController.GetOne");
			res.send(err);
		});
}

function New(userId){
	console.log('patientController.New');

	var patient = new Model();
	patient.user = userId;
	
	patient.save()
	.then(function(patient){
		Logger.log('Patient Created', 'D', 'PatientController.New');
	})
	.catch(function(err){
		Logger.log(err, "E", "PatientController.New");
		throw err;
	})
}

function Update(req, res){
	console.log('patientController.Update: ' + req.params.patient_id);

	Model.findByIdAndUpdate(req.params.patient_id, req.body).then(function(results) {

	/*
	patient.gender = req.body.gender;
	  	patient.birthDate = req.body.birthDate;
	  	patient.bloodType = req.body.bloodType;
	  	patient.diseases = [{}];
	  	patient.medicines = [{}];
	  	patient.doctors = [{}];
	  	patient.appointments = [{}];
	  	patient.documents = [{}];
	  	patient.labResults = [{}];

	*/
	  console.log('Updated patient');
	  res.send(results);
	}).catch(function(err){
		console.log(err);
		res.send(err);
	});
}

function Delete(req, res){
	console.log('patientController.Delete: ' + req.params.patient_id);
	Model.findByIdAndRemove(req.params.patient_id).then(function(results) {
	  res.send(results);
	}).catch(function(err){
		console.log(err);
		res.send(err);
	});
}

module.exports = {
	GetAll:GetAll, 
	GetProfile:GetOne, 
	New:New,
	UpdateProfile: Update,
	Remove: Delete
}