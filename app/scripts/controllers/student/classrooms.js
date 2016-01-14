'use strict';

angular.module('gradebookApp')
  .controller('StudentClassroomsCtrl', function ($scope, AuthService, MenuItems, classrooms) {

    $scope.user = AuthService.getUser();
    $scope.menuLinks = MenuItems[$scope.user.type];
    $scope.classrooms = classrooms;

  });
