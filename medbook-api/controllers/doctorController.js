'use strict';
var Model = require('./../models/doctorModel');
var Logger = require('./../controllers/errorController');

function GetAll(req, res){
	console.log('doctorController.GetAll');
	Model.find().then(function(results){
		res.send(results);
	});
}

function GetOne(req, res){
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

function New(userId){
	console.log('doctorController.New');

	var doctor = new Model();
	doctor.user = userId;

	doctor.save()
	.then(function(doctor){
		Logger.log('Doctor created', "D", "doctorController.New");
	})
	.catch(function(err){
		Logger.log(err, "E", "doctorController.New");
		throw(err);
	})
}

function Update(req, res){
	console.log('doctorController.Update: ' + req.params.doctor_id);

	Model.findByIdAndUpdate(req.params.doctor_id, req.body).then(function(results) {
	  console.log('Updated doctor');

	/*
	doctor.specialty = req.body.specialty;
  	doctor.patients = [{}];
  	doctor.appointments = [{}];
  	
  	*/
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
}

module.exports = {
	GetAll:GetAll, 
	GetProfile:GetOne, 
	New:New,
	UpdateProfile: Update,
	Remove: Delete
}