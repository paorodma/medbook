'use strict';
angular
  .module('medBook')
  .service('dataService', dataService);

//TODO: Use config file
var apiServer = "http://localhost:8080/";

function dataService($http){
  this.getMedicalSpecialties = function(){
    var specialty = {};
    var specialties = [];
    
    $http.get(apiServer + 'medicalSpecialties').then(function(response){
      
      for (let i = 0; i < response.data.length; i++) {
        specialty = response.data[i];
        specialties[i] = specialty;
      }
    });
    return specialties;
  }
  
}
