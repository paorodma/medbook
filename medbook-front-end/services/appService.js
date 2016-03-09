'use strict';
angular
  .module('medBook')
  .service('appService', appService);

//TODO: Use config file
var apiServer = "http://localhost:3000/";

function appService($http){
  this.signUp = function(){
    
    if (doctor)
    {
		$http.post(apiServer + 'doctors')
    		.then(function(response){
    			return response;
    		}
    }
    else
    {
		$http.post(apiServer + 'patients')
    		.then(function(response){
    			return response;
    		}
    }
  }
}