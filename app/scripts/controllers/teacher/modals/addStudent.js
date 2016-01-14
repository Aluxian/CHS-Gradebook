'use strict';

angular.module('gradebookApp')
  .controller('AddStudentModalCtrl', function ($scope, $filter, $modalInstance, dpd, classroom) {

    $scope.student = {};
    $scope.addText = 'Add';

    $scope.addStudent = function () {
      if ($scope.addText !== 'Add') {
        return;
      }

      $scope.addText = 'Adding...';

      var student = $scope.student;
      var students = [];
      angular.extend(students, classroom.students);

      $filter('removeDollarFields')(students);
      students.push(student);

      dpd.classrooms.put(classroom.id, {students: students}, function(result, error) {
        if (error) {
          $scope.error = error;
          $scope.addText = 'Add';
          $scope.$apply();
          return;
        }

        classroom.students.push(student);
        $modalInstance.close();
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
