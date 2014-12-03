'use strict'; // strict af.

angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngCookies'
  ])
  .config(['$stateProvider', 
          '$urlRouterProvider', 
          '$locationProvider', 
          '$httpProvider',
    function($stateProvider, $routeProvider, $locationProvider, $httpProvider) {
    
    var checkLoggedIn = function($q, $timeout, $http, $location) {
      var deferred = $q.defer(); // New promise

      // See if user is logged in
      $http.get('/loggedin').success(function(data) {
        if (data === 'true') {
          $timeout(deferred.resolve, 0);   
        } else {
          $timeout(function() { deferred.reject(); }, 0);
          $location.url('/');
        }
      });

      return deferred.promise;
    };

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
        controller: 'RegistrationCtrl',
        resolve: {
          loggedin: checkLoggedIn
        }
      });

    // $routeProvider.when('/auth/facebook', 'facebookAuth')

    // Map everything to 'home'
    $routeProvider.otherwise('/turnip/home');

    // Use HTML5 mode
    $locationProvider.html5Mode(true);

    // Make sure people who are logged out don't do anything
    $httpProvider.interceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          function(response) { // Success, just continue the request chain
            return response;
          }, 
          function(response) { // Error, see if it's a 401.
            if (response.status === 401) { $location.url('/'); }
            return $q.reject(response);
          }
        );
      };
    });

  }]);
