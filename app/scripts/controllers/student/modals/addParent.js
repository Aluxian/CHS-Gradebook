'use strict';

angular.module('gradebookApp')
  .controller('AddParentModalCtrl', function ($scope, $filter, $modalInstance, dpd, user) {

    $scope.parent = {};
    $scope.addText = 'Add';

    $scope.addParent = function () {
      if ($scope.addText !== 'Add') {
        return;
      }

      $scope.addText = 'Adding...';

      var parent = $scope.parent;
      var parents = [];
      angular.extend(parents, user.parents);

      $filter('removeDollarFields')(parents);
      parents.push(parent);

      dpd.users.put(user.id, {parents: parents}, function(result, error) {
        if (error) {
          $scope.error = error;
          $scope.addText = 'Add';
          $scope.$apply();
          return;
        }

        user.parents.push(parent);
        $modalInstance.close();
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
