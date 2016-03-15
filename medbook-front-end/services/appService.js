'use strict';
angular
  .module('medBook')
  .service('AppService', appService);

//TODO: Use config file
var applicationApiServer = "http://localhost:3000/";

function appService($http){
  this.signUp = function(name, lastName, email, password, isPatient, callback){

    console.log('Inside appService.signUp');
    
    var req = {
 		method: 'POST',
 		url: applicationApiServer + 'signUp',
 		data: {  'name': name,
                'lastName': lastName,
                'email': email,
                'password': password,
                'isPatient': isPatient
            }
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

  this.signIn = function(email, password, callback){

    console.log('Inside appService.signIn');
    
  	var req = {
   		method: 'POST',
   		url: applicationApiServer + 'authenticate',
   		data: { 'email': email,
                  'password': password                
                }
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