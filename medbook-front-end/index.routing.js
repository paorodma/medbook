'use strict';

(function() {
  angular
    .module('medBook')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl'
      })
      .state('sign-up', {
        url: '/signup',
        templateUrl: 'sign-up/sign-up.view.html',
        controller: 'signUpCtrl'
      })
      .state('sign-in', {
        url: '/signin',
        templateUrl: 'sign-in/sign-in.view.html',
        controller: 'signInCtrl'
      })
      .state('patient-load-appointments', {
        url: '/patients/appointments',
       templateUrl: 'patients/appointments/appointments.view.html',
        controller: 'appointmentsCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
