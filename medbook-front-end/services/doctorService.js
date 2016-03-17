'use strict';
angular
  .module('medBook')
  .service('DoctorService', doctorService);

//TODO: Use config file
var doctorApiServer = "http://localhost:3000/doctors/";

function doctorService($http){
  this.getAssignedAppointments = function(token, doctorId, callback){
  
    console.log('Inside doctorService.getAssignedAppointments');
    
    var req = {
      method: 'GET',
      url: doctorApiServer + doctorId + '/appointments',
      headers: { 'x-access-token': token}
    }
  
    $http(req)
    .then(function(result){
        callback(result);
      })
    .catch(function(err){
      callback(err);
    });
  
    /*var appointment = {};
    var appointments = [];
    
    $http.get(doctorApiServer).then(function(response){
      
      for (let i = 0; i < response.data.length; i++) {
        doctor = response.data[i];
        doctors[i] = doctor;
      }
    });
    return doctors;*/
  }

  this.getDoctorProfile = function(token, doctorId, callback){
  
    console.log('Inside doctorService.getDoctorProfile');
    
    var req = {
      method: 'GET',
      url: doctorApiServer + doctorId,
      headers: { 'x-access-token': token}
    }
  
    $http(req)
    .then(function(result){
        callback(result);
      })
    .catch(function(err){
      callback(err);
    });
  }

  this.getMyPatients = function(token, doctorId, callback){
  
    console.log('Inside doctorService.getMyPatients');
    
    var req = {
      method: 'GET',
      url: doctorApiServer + doctorId + '/patients',
      headers: { 'x-access-token': token}
    }
  
    $http(req)
    .then(function(result){
        callback(result);
      })
    .catch(function(err){
      callback(err);
    });
  }
  
}