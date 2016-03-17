angular
	.module('medBook')
	.directive('myDoctors', myDoctors);

function myDoctors(){
  return{
    restrict: 'E',
    templateUrl: '/patients/myDoctors/myDoctors.tmpl.html',
    bindToController : true,
    controllerAs: 'myDoctors-vm',
    controller: myDoctorsCtrl
  } 
}  

function myDoctorsCtrl(PatientService, $state) {
	var myDoctorsVM = this;
  myDoctorsVM.errorMessage = "";

  getmyDoctors();
  
  function getmyDoctorsCallback(result){
      console.log('getmyDoctorsCallback - result' + result.data);
      if(result.data.user)
      {
        myDoctorsVM.errorMessage="";
      }
      else
      {
          $state.go('sign-in');
      }
    }

  function getmyDoctors(){
    console.log('getmyDoctors');
		var token = localStorage.getItem('securityToken');
    var userID = localStorage.getItem('userID');
    var entityID = localStorage.getItem('entityID');
		
    console.log('Calling PatientService.getmyDoctors');			
  
    PatientService.getMyDoctors(entityID, token, getmyDoctorsCallback);
  }
}