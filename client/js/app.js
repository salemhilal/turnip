'use strict'; // strict af.

angular
  .module('app', [
    'lbServices',
    'ui.router',
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
          function($stateProvider, $routeProvider) {

    // Add a default state (turnip)
    $stateProvider
      .state('turnip', {
        url: '',
        templateUrl: 'js/turnip/templates/turnip.html',
        controller: 'TurnipCtrl'
      });

    // Map everything to 'turnip'
    $routeProvider.otherwise('turnip');

  }]);
