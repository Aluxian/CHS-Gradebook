'use strict';

angular.module('gradebookApp')
  .controller('ParentClassroomCtrl', function ($scope, AuthService, MenuItems, student) {

    $scope.user = AuthService.getUser();
    $scope.menuLinks = MenuItems[$scope.user.type];
    $scope.student = student;

    student.classroom.students.forEach(function(std) {
      if (std.email === student.email) {
        $scope.grades = std.grades;
      }
    });

  });
