'use strict';
angular
	.module('medBook')
	.directive('myPatients', myPatients);

function myPatients(){
	return{
		restrict: 'E',
		templateUrl: '/doctors/myPatients/myPatients.tmpl.html',
		bindToController : true,
		controllerAs: 'myPatientsVM',
		controller: MyPatientsController
	}	
}

function MyPatientsController(DoctorService, $state){
  //console.log("Inside DoctorInfoController");
  var myPatientsVM = this;
  myPatientsVM.errorMessage = "";

  var token = localStorage.getItem('securityToken');
  var userID = localStorage.getItem('userID');
  var entityID = localStorage.getItem('entityID');
  
  getMyPatients();

   function getMyPatientsCallback(result){
      console.log('getMyPatientsCallback - Result:' + result.data.success);
      if(result.data.success)
      {
        myPatientsVM.errorMessage="";
        console.log('My patients loaded correctly');
      }
      else
      {
          //console.log('token used: ' + localStorage.getItem('securityToken'));
          $state.go('sign-in');
      }
    }

	function getMyPatients(){
    	//console.log('getMyPatients');
    	console.log('Calling DoctorService.getMyPatients');			
    	DoctorService.getMyPatients(token, entityID, getMyPatientsCallback);
  }
}