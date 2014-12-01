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
    LoopBackAuth.currentUserId = $cookies['user_id'];
    LoopBackAuth.accessTokenId = $cookies['access-token'];
    LoopBackAuth.rememberMe = false;
    LoopBackAuth.save();
    console.log(LoopBackAuth);

    User.getCurrent(function(userData) {
      console.log(userData);
    }, function(err) {
      console.error(err);
    });
  }]);