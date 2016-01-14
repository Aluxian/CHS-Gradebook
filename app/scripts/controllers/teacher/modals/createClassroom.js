'use strict';

angular.module('gradebookApp')
  .controller('CreateClassroomModalCtrl', function ($scope, $modalInstance, $location, dpd) {

    $scope.cr = {
      gradeLevel: 'pre-k',
      students: []
    };
    $scope.addText = 'Add';

    $scope.createClass = function () {
      if ($scope.addText !== 'Add') {
        return;
      }

      $scope.addText = 'Adding...';

      dpd.classrooms.post($scope.cr, function(result, error) {
        if (error) {
          $scope.error = error;
          $scope.addText = 'Add';
          $scope.$apply();
          return;
        }

        $modalInstance.close();
        $location.path('/teacher/classroom/' + result.id);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
