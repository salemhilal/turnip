'use strict';

angular
  .module('app')
  .controller('TurnipCtrl', ['$scope', '$state',
              function($scope, $state) {

  }])
  .controller('LogInCtrl', 
              ['$scope', 'LoopBackAuth', '$cookies', '$location',
              function($scope, LoopBackAuth, $cookies, $location) {
    LoopBackAuth.currentUserId = $cookies['user-id'];
    LoopBackAuth.accessTokenId = $cookies['user-access-token'];
    LoopBackAuth.rememberMe = false;
    LoopBackAuth.save();
    $location.url('/turnip/registration');
  }])
  .controller('RegistrationCtrl',
              ['$scope', '$state', 'User', 'LoopBackAuth', '$cookies', '$http',
              function($scope, $state, User, LoopBackAuth, $cookies, $http) {
                console.log($cookies);
    LoopBackAuth.currentUserId = $cookies['user-id'];
    LoopBackAuth.accessTokenId = $cookies['user-access-token'];
    LoopBackAuth.rememberMe = false;
    LoopBackAuth.save();

    $http.get('/loggedin')
      .success(function(data) {console.log('logged in', data);})
      .error(function(data) {console.error('not logged in', data);});

    User.getCurrent(function(userData) {
      console.log(userData);
    }, function(err) {
      console.error(err);
    });
  }]);
