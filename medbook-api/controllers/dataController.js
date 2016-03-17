'use strict';
var Logger = require('./../controllers/errorController');
var fs = require('fs');

function ReadFile(fileName, locale, res){
	
	var l = locale || "en-US"
	var path = "./medbook-api/data/" + l + "/" + fileName;

	Logger.log("Reading file " + path, "I", "dataController");

	fs.readFile(path, function(err, data){
		if (err){
			Logger.log(err, "E", "dataController.ReadFile");
			res.send(err);
		}
		else{
			res.send(JSON.parse(data));
		}
	});

}

function GetBloodTypes(req, res){
	ReadFile("bloodTypes.json", req.body.locale, res);
}

function GetLabTests(req, res){
	ReadFile("labTests.json", req.body.locale, res);
}

function GetMedicalSpecialties(req, res){
	ReadFile("medicalSpecialties.json", req.body.locale, res);
}

function GetDrugs(req, res){
	ReadFile("medicines.json", req.body.locale, res);
}

module.exports = {
	GetBloodTypes:GetBloodTypes, 
	GetLabTests: GetLabTests,
	GetMedicalSpecialties: GetMedicalSpecialties,
	GetDrugs: GetDrugs  
}