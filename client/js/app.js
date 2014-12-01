'use strict'; // strict af.

angular
  .module('app', [
    'lbServices',
    'ui.router',
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
      .state('turnip2', {
        url: '/turnip/turnip2', 
        templateUrl: 'js/turnip/templates/turnip2.html',
        controller: 'TurnipCtrl'
      });

    // $routeProvider.when('/auth/facebook', 'facebookAuth')

    // Map everything to 'turnip'
    $routeProvider.otherwise('/turnip/home');

    // Use HTML5 mode
    $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');

  }]);
