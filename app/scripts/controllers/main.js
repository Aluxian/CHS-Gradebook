'use strict';

angular.module('gradebookApp')
  .controller('MainCtrl', function ($scope, $location, dpd, AuthService) {
    $scope.logout = function() {
      dpd.users.logout();
      AuthService.setUser(null);
      $location.path('/');
    };
  });
