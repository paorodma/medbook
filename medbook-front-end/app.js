'use strict';
angular.module('medBook', ['ui.router']).run(
	function($rootScope, $state){
		$rootScope.$state = $state;
	});

angular.module('medBook')
	.controller('globalCtrlr', globalCtrlr); //Controlador global

	function globalCtrlr() {
		var vm = this;
	}
