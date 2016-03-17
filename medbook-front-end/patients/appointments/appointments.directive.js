angular
	.module('medBook')
  .directive('appointments', appointments);

function appointments(){
  return{
    restrict: 'E',
    templateUrl: '/patients/appointments/appointments.tmpl.html',
    bindToController : true,
    controllerAs: 'appointments-vm',
    controller: appointmentsCtrl
  } 
}  

function appointmentsCtrl(PatientService, $state) {
	var appointmentsVM = this;
  appointmentsVM.errorMessage = "";

  loadPage();

  function loadPage(){
    getAppointments();
  }
  
  function getProfileCallback(result){
      console.log('getProfileCallback - result:' + result.data.user);
      if(result.data.user)
      {
        appointmentsVM.errorMessage="";
        console.log('Got Profile successfully');
      }
      else
      {
          $state.go('sign-in');
      }
    }

	function getAppointments(){
    console.log('getAppointments');
		var token = localStorage.getItem('securityToken');
    var userID = localStorage.getItem('userID');
    var entityID = localStorage.getItem('entityID');
		
    console.log('Calling PatientService.getAppointments');			
  
    PatientService.getProfile(entityID, token, getProfileCallback);
  }
}