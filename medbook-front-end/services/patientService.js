'use strict';
angular
  .module('medBook')
  .service('PatientService', patientService);

//TODO: Use config file
var patientsApiServer = "http://localhost:3000/patients/";

function patientService($http){
  this.getProfile = function(patientId, token, callback){

    console.log('Inside patientService.getProfile');
    console.log('patientId: ' + patientId);
    console.log('token: ' + token);
    
    var req = {
      method: 'GET',
      url: patientsApiServer + patientId,
      headers: {  'x-access-token': token}
    }
  
    $http(req)
    .then(function(result){
        console.log(result);
        callback(result);
      })
    .catch(function(err){
      callback(err);
    });
  }

  this.getPersonalInfo = function(token, patientId, callback){
    var req = {
      method: 'GET',
      url: patientsApiServer + patientId + '/personalInfo',
      headers: {  'x-access-token': token}
    }
  
    $http(req)
    .then(function(result){
        console.log(result);
        callback(result);
      })
    .catch(function(err){
      callback(err);
    }); 
  }

  this.getMedicalInfo = function(token, patientId, callback){

  }

  this.getMyDoctors = function(token, patientId, callback){

  }

}
