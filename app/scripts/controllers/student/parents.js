'use strict';

angular.module('gradebookApp')
  .controller('StudentParentsCtrl', function ($scope, $modal, AuthService, MenuItems) {

    $scope.user = AuthService.getUser();
    $scope.user.parents = $scope.user.parents || {};
    $scope.menuLinks = MenuItems[$scope.user.type];
    $scope.parents = $scope.user.parents;

    $scope.openAddParentModal = function () {
      $modal.open({
        templateUrl: 'views/student/modal-addParent.html',
        controller: 'AddParentModalCtrl',
        resolve: {
          user: function() {
            return $scope.user;
          }
        }
      });
    };

    $scope.removeParent = function(parent) {
      $scope.user.parents.forEach(function(prnt, index, parents) {
        if (prnt.email === parent.email) {
          parents.splice(index, 1);
        }
      });

      dpd.users.put($scope.user.id, {parents: $scope.user.parents}, function(result, err) {
        // TODO: Handle error case
      });
    };

  });
