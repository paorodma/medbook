angular
	.module('medBook')
	.controller('appointmentsCtrl', appointmentsCtrl);

function appointmentsCtrl(PatientService, $state) {
	console.log('Inside appointmentsCtrl');
	var appointmentsVM = this;
  appointmentsVM.errorMessage = "";

  loadPage();

  function loadPage(){
    console.log('Loading page');
    getAppointments();
  }
  
  function getProfileCallback(result){
      console.log(result.data.user);
      if(result.data.user)
      {
        appointmentsVM.errorMessage="";
        console.log('everything ok');
      }
      else
      {
          $state.go('sign-in');
      }
    }

	//appointmentsVM.getAppointments = function(){
  function getAppointments(){
    console.log('getAppointments');
		var token = localStorage.getItem('securityToken');
    var userID = localStorage.getItem('userID');
    var entityID = localStorage.getItem('entityID');
		
    console.log('Calling PatientService.getAppointments');			
  
    PatientService.getProfile(entityID, token, getProfileCallback);
  }
}