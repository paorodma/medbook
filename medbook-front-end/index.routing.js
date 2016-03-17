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
        controller: 'homeCtrl', 
        controllerAs: 'homeVM'
      })
      .state('sign-up', {
        url: '/signup',
        templateUrl: 'sign-up/sign-up.view.html',
        controller: 'signUpCtrl',
        controllerAs: 'signUpVM'
      })
      .state('sign-in', {
        url: '/signin',
        templateUrl: 'sign-in/sign-in.view.html',
        controller: 'signInCtrl',
        controllerAs: 'signInVM'
      })
      .state('sign-out', {
        url: '/signout',
        templateUrl: 'sign-out/sign-out.view.html',
        controller: 'signOutCtrl',
        controllerAs: 'signOutVM'
      })

      //patients
      .state('patient-overview', {
        url: '/patients/overview',
        templateUrl: 'patients/overview/overview.view.html',
        controller: 'patientsOverviewCtrl',
        controllerAs: 'pOverviewVM'
      })

      //doctors
      .state('doctor-overview', {
        url: '/doctors/overview',
        templateUrl: 'doctors/overview/overview.view.html',
        controller: 'doctorsOverviewCtrl',
        controllerAs: 'dOverviewVM'
      });


    $urlRouterProvider.otherwise('/');
  }

})();
