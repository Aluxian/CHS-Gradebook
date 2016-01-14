'use strict';

angular.module('gradebookApp')
  .controller('AlertModalCtrl', function ($scope, $modalInstance, message) {

    $scope.message = message;

    $scope.ok = function () {
      $modalInstance.dismiss('cancel');
    };

  });
