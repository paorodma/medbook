var app = angular.module('medBook', ['pascalprecht.translate']);

 angular
    .module('medBook')
    .config(translateConfig);

  /** @ngInject */
  function translateConfig($translateProvider) {
    
    $translateProvider.translations('en', {
    	'SignIn.Title': 'Sign In'
  	});


  	$translateProvider.translations('es', {
	    'SignIn.Title': 'Entrar'
  	});

  	$translateProvider.preferredLanguage('en');
  }