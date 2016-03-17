'use strict';
var Model = require('./../models/doctorModel');
var Logger = require('./../controllers/errorController');
var logSource = "doctorController";

function GetAll(req, res){
	Logger.log('doctorController.GetAll', 'I', logSource);
	Model.find().then(function(results){
		res.send(results);
	});
}

function FindByUserId(userId, callback){
	Logger.log("Find Doctor by userId", 'I', logSource);
	Model.findOne({'user': userId })
		.then(function(result){
			Logger.log(result);
			callback(result);
		})
		.catch(function(err){
			Logger.log(err, 'E', logSource + ".FindByUserId");
			callback(err);
		})
}

function GetOne(req, res){
	Logger.log('doctorController.GetOne: ' + req.params.doctor_id, 'I', logSource);
	Model.findById(req.params.doctor_id)
		.then(function(results){
			Logger.log(results, 'D', logSource + '.GetOne')
			res.send(results);
		})
		.catch(function(err){
			Logger.log(err, 'E', logSource + ".GetOne");
			res.send(err);
		});
}

function GetDoctorAppointments(req, res){
	Logger.log('doctorController.GetDoctorAppointments. Doctor: ' + req.params.doctor_id, 'I', logSource);
	Model.findById(req.params.doctor_id)
		.then(function(results){
			Logger.log(results.appointments, 'D', logSource + '.GetOne')
			
			 res.json({
			        	  success: true,
			          	  appointments: results.appointments
			        	});
		})
		.catch(function(err){
			Logger.log(err, 'E', logSource + ".GetOne");
			res.send(err);
		});
}

function GetDoctorPatients(req, res){
	Logger.log('doctorController.GetDoctorPatients. Doctor: ' + req.params.doctor_id, 'I', logSource);
	Model.findById(req.params.doctor_id)
		.then(function(results){
			Logger.log(results.patients, 'D', logSource + '.GetOne')
			res.json({
			        	  success: true,
			          	  patients: results.patients
			        	});
		})
		.catch(function(err){
			Logger.log(err, 'E', logSource + ".GetOne");
			res.send(err);
		});
}

function New(userId){
	Logger.log('doctorController.New');

	var doctor = new Model();
	doctor.user = userId;

	doctor.save()
	.then(function(doctor){
		Logger.log('Doctor created', 'D', logSource + ".New");
	})
	.catch(function(err){
		Logger.log(err, 'E', logSource + ".New");
		throw(err);
	})
}

function Update(req, res){
	Logger.log('doctorController.Update: ' + req.params.doctor_id, 'I', logSource);

	Model.findByIdAndUpdate(req.params.doctor_id, req.body).then(function(results) {
	  Logger.log('Updated doctor', 'I', logSource);

	/*
	doctor.specialty = req.body.specialty;
  	doctor.patients = [{}];
  	doctor.appointments = [{}];
  	
  	*/
	  res.send(results);
	}).catch(function(err){
		Logger.log(err, 'E', logSource);
		res.send(err);
	});
}

function Delete(req, res){
	Logger.log('doctorController.Delete: ' + req.params.doctor_id, 'I', logSource);
	Model.findByIdAndRemove(req.params.doctor_id).then(function(results) {
	  res.send(results);
	}).catch(function(err){
		Logger.log(err, 'E', logSource);
		res.send(err);
	});
}

module.exports = {
	GetAll:GetAll,
	FindByUserId: FindByUserId, 
	GetProfile:GetOne, 
	New:New,
	UpdateProfile: Update,
	Remove: Delete,

	GetDoctorAppointments:GetDoctorAppointments,
	GetDoctorPatients:GetDoctorPatients
}