'use strict';
angular
  .module('medBook')
  .service('patientService', patientService);

//TODO: Use config file
var apiServer = "http://localhost:8080/";

function patientService($http){
  this.getPatients = function(){
    var patient = {};
    var patients = [];
    
    $http.get(apiServer + 'patients').then(function(response){
      
      for (let i = 0; i < response.data.length; i++) {
        patient = response.data[i];
        patients[i] = patient;
      }
    });
    return patients;
  }
  
}
