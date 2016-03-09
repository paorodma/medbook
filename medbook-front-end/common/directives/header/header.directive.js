'use strict';
angular
	.module('medBook')
	.directive('header', header);

function header(){
	return{
		restrict: 'E',
		templateUrl: '/common/directives/header/header.tmpl.html',
		bindToController : true,
		controllerAs: 'header-vm',
		controller: headerController
	}	
}

function headerController(){
	console.log("Inside headerController");
}