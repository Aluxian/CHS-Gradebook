'use strict';

angular.module('gradebookApp')
  .controller('ParentClassroomsCtrl', function ($scope, AuthService, MenuItems, students) {

    $scope.user = AuthService.getUser();
    $scope.menuLinks = MenuItems[$scope.user.type];
    $scope.students = students;

  });
