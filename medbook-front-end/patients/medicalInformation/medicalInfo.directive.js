angular
	.module('medBook')
	.directive('medicalInfo', medicalInfo);

function medicalInfo(){
  return{
    restrict: 'E',
    templateUrl: '/patients/medicalInformation/medicalInfo.tmpl.html',
    bindToController : true,
    controllerAs: 'medicalInfo-vm',
    controller: medicalInfoCtrl
  } 
}  

function medicalInfoCtrl(PatientService, $state) {
	var medicalInfoVM = this;
  medicalInfoVM.errorMessage = "";

  getmedicalInfo();
  
  function getInfoCallback(result){
      console.log('getmedicalInfo callback:' + result.data.user);
      if(result.data.user)
      {
        medicalInfoVM.errorMessage="";
      }
      else
      {
          $state.go('sign-in');
      }
    }

  function getmedicalInfo(){
    console.log('getmedicalInfo');
		var token = localStorage.getItem('securityToken');
    var userID = localStorage.getItem('userID');
    var entityID = localStorage.getItem('entityID');
		
    console.log('Calling PatientService.getmedicalInfo');			
    PatientService.getMedicalInfo(entityID, token, getInfoCallback);
  }
}