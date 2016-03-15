angular
	.module('medBook')
	.controller('signUpCtrl', signUpCtrl);

	function signUpCtrl($state, AppService) {
		console.log('Inside signUpCtrl');

		var signUpVM = this;

		//Private functions
		function signUpResponse(result){
			console.log(result);
	      if(result.data.errmsg)
	      {
	        signUpVM.errorMessage='User already exists';
	        signUpVM.cleanFields();
	        console.log(result.data.errmsg);
	      }
	      else
	      {
	      	signUpVM.errorMessage="";
	        $state.go('sign-in');
	      }
	    }

		signUpVM.signUp = function(){
			console.log('Calling AppService.signUp');			
      		AppService.signUp(signUpVM.name, signUpVM.lastName, signUpVM.email, signUpVM.password, signUpVM.isPatient, signUpResponse);
   		}

   		signUpVM.cleanFields = function(){
			console.log('Cleaning page fields');			
      		signUpVM.name = "";
      	 	signUpVM.lastName = "";
      	 	signUpVM.email = "";
      	 	signUpVM.password = "";
      	 	signUpVM.isPatient = null;
   		}

	}