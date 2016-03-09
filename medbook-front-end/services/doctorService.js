'use strict';
angular
  .module('medBook')
  .service('doctorService', doctorService);

//TODO: Use config file
var apiServer = "http://localhost:8080/";

function doctorService($http){
  this.getdoctors = function(){
    var doctor = {};
    var doctors = [];
    
    $http.get(apiServer + 'doctors').then(function(response){
      
      for (let i = 0; i < response.data.length; i++) {
        doctor = response.data[i];
        doctors[i] = doctor;
      }
    });
    return doctors;
  }
  
}
