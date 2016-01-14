'use strict';

angular.module('gradebookApp')
  .controller('StudentClassroomCtrl', function ($scope, AuthService, MenuItems, classroom) {

    $scope.user = AuthService.getUser();
    $scope.menuLinks = MenuItems[$scope.user.type];
    $scope.classroomName = classroom.name;

    classroom.students.forEach(function(student) {
      if (student.email === $scope.user.email) {
        $scope.grades = student.grades;
      }
    });

  });
