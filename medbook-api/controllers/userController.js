'use strict';
var Model = require('./../models/userModel');

var patient = require('./../controllers/patientController'); 
var doctor = require('./../controllers/doctorController'); 
var Logger = require('./../controllers/errorController');
var utils = require('./../controllers/utilsController');

var jwt = require('jsonwebtoken');
//var config = require ('./../config/environment/development');

function Authenticate(req, res){
	console.log("Inside userController Authenticate");
	Model.findOne({
    	email: req.body.email
  	}, function(err, user) {

    	if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } 
	    else if (user) {
	      	// check if password matches
	      	if (user.password != req.body.password) {
	        	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      	} 
	      	else {
		      	var token = jwt.sign(user, process.env.JWT_SECRET, {
		          expiresIn: 3600 // seconds. expires in 1 hour
		        });

		      	//Token is correct, now get entity ID (ie: if patient, patientId; if doctor, doctorId)
		      	var entId;

		      	if (user.isPatient){
		      			patient.FindByUserId(user._id, function(result){
			      		console.log('Got Patient EntityId: ' + result._id);
			      		entId = result._id;

			      		console.log('entId: ' + entId);
			      		 // return the information including token as JSON and EntityId 
			    	    res.json({
			        	  success: true,
			          	  message: 'Save your token!',
			              token: token,
			              usrId: user._id,
			              entityId: entId
			        	});
			      	});
		      	}
		      	else{
		      		doctor.FindByUserId(user._id, function(result){
		      		console.log('Got Doctor EntityId: ' + result._id);
		      		entId = result._id;

		      		console.log('entId: ' + entId);
		      		 // return the information including token as JSON and EntityId 
		    	    res.json({
		        	  success: true,
		          	  message: 'Save your token!',
		              token: token,
		              usrId: user._id,
		              entityId: entId
		        	});
		      	});
		      	}

			}
		}
	}
)}

function ValidateToken(req, res, next){
  console.log('Validating token');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;    
        console.log('Token verified');
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    console.log('No token');
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}

function GetAll(req, res){
	console.log('userController.GetAll');
	Model.find().then(function(results){
		res.send(results);
	});
}

/*function GetOne(req, res){
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
*/
function New(req, res){
	console.log('userController.New');
	console.log(req.body.name);

	var usr = new Model();
	usr.name = req.body.name;
	usr.lastName =  req.body.lastName;
	usr.email =  req.body.email;
	usr.password = req.body.password;
	usr.isPatient = req.body.isPatient;
	usr.isAdmin = req.body.isAdmin;
	usr.setPassword();

	usr.save()
	.then(function(usr){
		if (usr.isPatient){
			patient.New(usr.id);
		}
		else{
			doctor.New(usr.id);
		}
		return usr;
	})
	.then(function(usr){
		console.log('usr created: ' + usr);
		var emailBody = '<p>' + usr.name + ', you have just created an account in medBook</p>';
		emailBody += '<p><b>Visit us now!</b></p>';
		emailBody += '<a href="http://localhost:3000/#/signin">Medbook</a>';

		utils.SendEmail(usr.email, "Welcome to MedBook", emailBody);
		res.send(usr);
	})
	.catch(function(err){
		Logger.log(err, "E", "userController.New");
		res.send(err);
	})
}

/*
function Update(req, res){
	console.log('doctorController.Update: ' + req.params.doctor_id);

	Model.findByIdAndUpdate(req.params.doctor_id, req.body).then(function(results) {
	  console.log('Updated doctor');
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
}*/

module.exports = {
	SignUp:New,
	Authenticate: Authenticate,
	ValidateToken: ValidateToken,
	GetAll:GetAll
	////GetProfile:GetOne, 
	//UpdateProfile: Update,
	//Remove: Delete
}
