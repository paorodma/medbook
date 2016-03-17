'use strict';
angular
	.module('medBook')
	.directive('header', header);

function header(){
	return{
		restrict: 'E',
		templateUrl: '/common/directives/header/header.tmpl.html',
		bindToController : true,
		controllerAs: 'headerVm',
		controller: headerController
	}	
}

function headerController($scope){
	//console.log("Inside headerController");
}