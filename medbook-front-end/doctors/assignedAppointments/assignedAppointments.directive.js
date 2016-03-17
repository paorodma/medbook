angular
	.module('medBook')
  .directive('assignedAppointments', assignedAppointments);

function assignedAppointments(){
  return{
    restrict: 'E',
    templateUrl: '/doctors/assignedAppointments/assignedAppointments.tmpl.html',
    bindToController : true,
    controllerAs: 'assignedAppointmentsVM',
    controller: assignedAppointmentsCtrl
  } 
}  

function assignedAppointmentsCtrl(DoctorService, $state) {
	//console.log('Inside assignedAppointmentsCtrl');
	var assignedAppointmentsVM = this;
  assignedAppointmentsVM.errorMessage = "";

  var token = localStorage.getItem('securityToken');
  var userID = localStorage.getItem('userID');
  var entityID = localStorage.getItem('entityID');
  
  getAssignedAppointments();
  
  function getAppointmentsCallback(result){
      console.log('getAppointmentsCallback - Result:' + result);
      if(result.data.success)
      {
        assignedAppointmentsVM.errorMessage="";
        console.log('Appointment loaded correctly');
      }
      else
      {
          //console.log('token used: ' + localStorage.getItem('securityToken'));
          $state.go('sign-in');
      }
    }

	function getAssignedAppointments(){
    //console.log('getAssignedAppointments');
    console.log('Calling DoctorService.getAssignedAppointments');			
    DoctorService.getAssignedAppointments(token, entityID, getAppointmentsCallback);
  }
}