'use strict'; // strict af.

angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngCookies'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
          function($stateProvider, $routeProvider, $locationProvider) {

    // Add a default state (turnip)
    $stateProvider
      .state('turnip', {
        url: '/turnip/home',
        templateUrl: 'js/turnip/templates/turnip.html',
        controller: 'TurnipCtrl'
      })
      .state('registration', {
        url: '/turnip/registration', 
        templateUrl: 'js/turnip/templates/registration.html',
        controller: 'RegistrationCtrl'
      });

    // $routeProvider.when('/auth/facebook', 'facebookAuth')

    // Map everything to 'home'
    $routeProvider.otherwise('/turnip/home');

    // Use HTML5 mode
    $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');

  }]);
