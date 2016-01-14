'use strict';

angular.module('gradebookApp')
  .controller('HomeCtrl', function ($scope, AuthService, RolePaths) {
    $scope.user = AuthService.getUser();
    $scope.dashboardUrl = RolePaths[$scope.user.type];
  });
