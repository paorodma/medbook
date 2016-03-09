(function() {
  'use strict';

	angular
    	.module('medBook')
    	.directive('signInModal', signInModal);

  function signInModal() {
    var directive = {
      restrict: 'E',
      templateUrl: 'sign-in/sign-in.view.html'
    };
  
    console.log('Inside signInModal directive');
    return directive;
  }
})();