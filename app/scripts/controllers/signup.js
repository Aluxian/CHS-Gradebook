'use strict';

angular.module('gradebookApp')
  .controller('SignupCtrl', function ($scope, $location, AuthService, RolePaths, dpd) {
    $scope.user = {};

    $scope.signUp = function() {
      $scope.user.username = $scope.user.email;

      dpd.users.post($scope.user, function(user, error) {
        if (error) {
          $scope.error = error.message;
          $scope.$apply();
          return;
        }

        AuthService.setUser(user);

        $scope.$apply(function() {
          $location.path(RolePaths[user.type]);
        });

        dpd.users.login($scope.user);
      });
    };
  });
