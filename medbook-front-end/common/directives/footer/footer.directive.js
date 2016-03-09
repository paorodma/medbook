'use strict';
angular
	.module('medBook')
	.directive('footer', footer);

function footer(){
	return{
		restrict: 'E',
		templateUrl: '/common/directives/footer/footer.tmpl.html',
		bindToController : true,
		controllerAs: 'footer-vm',
		controller: footerController
	}	
}

function footerController(){
	console.log("Inside footerController");
}