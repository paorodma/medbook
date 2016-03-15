'use strict';
angular
  .module('medBook')
  .service('PatientService', patientService);

//TODO: Use config file
var patientsApiServer = "http://localhost:3000/patients/";

function patientService($http){
  /*this.getPatients = function(){
    var patient = {};
    var patients = [];
    
    $http.get(patientsApiServer + 'patients').then(function(response){
      
      for (let i = 0; i < response.data.length; i++) {
        patient = response.data[i];
        patients[i] = patient;
      }
    });
    return patients;
  }*/

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
}
