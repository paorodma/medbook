angular
	.module('medBook')
	.controller('signInCtrl', signInCtrl);

	function signInCtrl(AppService, $state, $scope) {
		
		var signInVM = this;
    signInVM.errorMessage = "";
    console.log('Inside signInCtrl');
    
    function signInResponse(result){
      if(result.data.success)
      {
        //Save userId and token
        $scope.headerVm.loggedIn = true;
        
        localStorage.setItem('userID', result.data.usrId);
        localStorage.setItem('securityToken', result.data.token);
        localStorage.setItem('entityID', result.data.entityId);

        signInVM.errorMessage="";
        if (result.data.isPatient)
        {
          $state.go('patient-overview');    
        }
        else
        {
          $state.go('doctor-overview');     
        }
      }
      else
      {
        signInVM.errorMessage='Invalid user or password';
        console.log(result.data.message);
      }
    }

		signInVM.signIn = function(){
			console.log('Calling AppService.signIn');			
      		AppService.signIn(signInVM.email, signInVM.password, signInResponse);
   	}
	}
