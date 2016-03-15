'use strict';
angular
  .module('medBook')
  .service('dataService', dataService);

//TODO: Use config file
var dataApiServer = "http://localhost:3000/data";

function dataService($http){
  this.getMedicalSpecialties = function(){
    var specialty = {};
    var specialties = [];
    
    $http.get(dataApiServer + 'medicalSpecialties').then(function(response){
      
      for (let i = 0; i < response.data.length; i++) {
        specialty = response.data[i];
        specialties[i] = specialty;
      }
    });
    return specialties;
  }
  
}
