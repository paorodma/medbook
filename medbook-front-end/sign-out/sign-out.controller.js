angular.module('medBook')
  .controller('signOutCtrl', function($scope, $window) {
  	console.log('Inside signOutCtrl');
  	clearStorage();
    
	function clearStorage(){
	   console.log('Clearing storage');
	   
     localStorage.removeItem('userID');
     localStorage.removeItem('securityToken');
     localStorage.removeItem('entityID');
     
     //console.log('Token: ' + localStorage.getItem('securityToken'));
     $scope.headerVm.loggedIn = false;
	}
    
    $scope.onExit = function() {
      console.log('bye bye');
      clearStorage(); 
    };

   $window.onbeforeunload =  $scope.onExit;
  });