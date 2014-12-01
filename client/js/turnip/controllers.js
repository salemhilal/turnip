'use strict';

angular
  .module('app')
  .controller('TurnipCtrl', ['$scope', '$state', 'Profile', 
              function($scope, $state, Profile) {

  }])
  .controller('RegistrationCtrl', 
              ['$scope', '$state', 'User', 'LoopBackAuth', '$cookies',
              function($scope, $state, User, LoopBackAuth, $cookies) {
                console.log($cookies);
    LoopBackAuth.currentUserId = $cookies['user-id'];
    LoopBackAuth.accessTokenId = $cookies['user-access-token'];
    LoopBackAuth.rememberMe = false;
    LoopBackAuth.save();
    console.log(LoopBackAuth);

    User.getCurrent(function(userData) {
      console.log(userData);
    }, function(err) {
      console.error(err);
    });
  }]);