'use strict';

angular.module('gradebookApp')
  .controller('SigninCtrl', function ($scope, $location, AuthService, RolePaths, dpd) {
    $scope.user = {};

    $scope.signIn = function() {
      dpd.users.login($scope.user, function(user, error) {

        if (error) {
          $scope.error = error.message;
          $scope.$apply();
          return;
        }

        dpd.users.get(user.uid, function(user, error) {
          if (error) {
            $scope.error = error.message;
            $scope.$apply();
            return;
          }

          AuthService.setUser(user);

          $scope.$apply(function() {
            $location.path(RolePaths[user.type]);
          });
        });

      });
    };
  });
