angular
	.module('medBook')
	.directive('personalInfo', personalInfo);

function personalInfo(){
  return{
    restrict: 'E',
    templateUrl: '/patients/personalInformation/personalInfo.tmpl.html',
    bindToController : true,
    controllerAs: 'personalInfoVM',
    controller: personalInfoCtrl
  } 
}  

function personalInfoCtrl(PatientService, $state) {
	console.log('Inside personalInfoCtrl');
	var personalInfoVM = this;
  personalInfoVM.errorMessage = "";

  var token = localStorage.getItem('securityToken');
  var userID = localStorage.getItem('userID');
  var entityID = localStorage.getItem('entityID');

  getpersonalInfo();
  
  function getPersonalInfoCallback(result){
      console.log('getPersonalInfo Callback' + result);
      if(result.data.user)
      {
        personalInfoVM.errorMessage="";
        /*personalInfoVM.name = user.name;
        personalInfoVM.lastName = user.lastName;
        personalInfoVM.birthDate = user.birthDate;
        personalInfoVM.gender = user.gender;*/

        personalInfoVM.name = 'Paola';
        personalInfoVM.lastName = 'Rodriguez';
        personalInfoVM.birthDate = '07/08/1984';
        personalInfoVM.gender = 'F';
         
      }
      else
      {
          $state.go('sign-in');
      }
    }

  function getpersonalInfo(){
    PatientService.getPersonalInfo(token, entityID, getPersonalInfoCallback);
  }
}