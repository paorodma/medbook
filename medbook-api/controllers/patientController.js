'use strict';
var Model = require('./../models/patientModel');
var User = require('./../models/patientModel');
var Logger = require('./../controllers/errorController');

function GetAll(req, res){
	Logger.log('patientController.GetAll');
	Model.find().then(function(results){
		res.send(results);
	});
}

function FindByUserId(userId, callback){
	Logger.log("Find Patient by userId");
	Model.findOne({'user': userId })
		.then(function(result){
			Logger.log(result);
			callback(result);
		})
		.catch(function(err){
			Logger.log(err, "E", "patientController.FindByUserId");
			callback(err);
		})
}

function GetOne(req, res){
	Logger.log('patientController.GetOne: ' + req.params.patient_id);
	Model.findById(req.params.patient_id)
		.then(function(results){
			res.send(results);
		})
		.catch(function(err){
			Logger.log(err, "E", "patientController.GetOne");
			res.send(err);
		});
}

function GetPatientDoctors(req, res){
	Logger.log('patientController.GetPatientDoctors: ' + req.params.patient_id);
	Model.findById(req.params.patient_id)
		.then(function(results){
			res.send(results.doctors);
		})
		.catch(function(err){
			Logger.log(err, "E", "patientController.GetPatientDoctors");
			res.send(err);
		});
}

function GetPatientAppointments(req, res){
	Logger.log('patientController.GetPatientAppointments: ' + req.params.patient_id);
	Model.findById(req.params.patient_id)
		.then(function(results){
			res.send(results.appointments);
		})
		.catch(function(err){
			Logger.log(err, "E", "patientController.GetPatientAppointments");
			res.send(err);
		});
}

function New(userId){
	Logger.log('patientController.New');

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
	Logger.log('patientController.Update: ' + req.params.patient_id);

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
	  Logger.log('Updated patient');
	  res.send(results);
	}).catch(function(err){
		Logger.log(err);
		res.send(err);
	});
}

function Delete(req, res){
	Logger.log('patientController.Delete: ' + req.params.patient_id);
	Model.findByIdAndRemove(req.params.patient_id).then(function(results) {
	  res.send(results);
	}).catch(function(err){
		Logger.log(err);
		res.send(err);
	});
}

function GetPersonalInformation(req, res){
	/*
	Logger.log('patientController.GetPersonalInformation: ' + req.params.patient_id);
	Model.findOne({_id: req.params.patient_id}).populate('user').exec(
		function (err, result) {
			  if (err) {
			  	res.send(err);console.log(err);
			  }
			  console.log(result);
			  res.send(result);
			  
			})
*/
	GetOne(req,res);
}

module.exports = {
	GetAll:GetAll, 
	FindByUserId: FindByUserId,
	GetProfile:GetOne, 
	New:New,
	UpdateProfile: Update,
	Remove: Delete,

	GetPersonalInformation: GetPersonalInformation
	/*GetMedicalInformation: GetMedicalInformation,
	GetDoctors: GetDoctors,
	GetAppointments: GetAppointments*/
}