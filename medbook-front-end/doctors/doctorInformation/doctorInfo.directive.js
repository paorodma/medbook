'use strict';
angular
	.module('medBook')
	.directive('doctorInfo', doctorInfo);

function doctorInfo(){
	return{
		restrict: 'E',
		templateUrl: '/doctors/doctorInformation/doctorInfo.tmpl.html',
		bindToController : true,
		controllerAs: 'doctorInfoVM',
		controller: DoctorInfoController
	}	
}

function DoctorInfoController(DoctorService, $state){
  //console.log("Inside DoctorInfoController");
  var doctorInfoVM = this;
  doctorInfoVM.errorMessage = "";

  var token = localStorage.getItem('securityToken');
  var userID = localStorage.getItem('userID');
  var entityID = localStorage.getItem('entityID');
  
  getDoctorProfile();

   function getDoctorProfileCallback(result){
      console.log('getDoctorProfileCallback - Result:' + result);
      if(result.data.user)
      {
        doctorInfoVM.errorMessage="";
        console.log('Doctor Profile loaded correctly');
      }
      else
      {
          //console.log('token used: ' + localStorage.getItem('securityToken'));
          $state.go('sign-in');
      }
    }

	function getDoctorProfile(){
    	//console.log('getDoctorProfile');
    	console.log('Calling DoctorService.getDoctorProfile');			
    	DoctorService.getDoctorProfile(token, entityID, getDoctorProfileCallback);
  }
}