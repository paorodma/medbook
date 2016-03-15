'use strict';
angular
  .module('medBook')
  .service('doctorService', doctorService);

//TODO: Use config file
var doctorApiServer = "http://localhost:3000/doctors/";

function doctorService($http){
  this.getdoctors = function(){
    var doctor = {};
    var doctors = [];
    
    $http.get(doctorApiServer).then(function(response){
      
      for (let i = 0; i < response.data.length; i++) {
        doctor = response.data[i];
        doctors[i] = doctor;
      }
    });
    return doctors;
  }
  
}
