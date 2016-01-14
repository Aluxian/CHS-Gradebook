'use strict';

angular.module('gradebookApp')
  .directive('feature', function ($modal) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          $modal.open({
            templateUrl: 'views/modals/alert.html',
            controller: 'AlertModalCtrl',
            resolve: {
              message: function() {
                return attrs.feature;
              }
            }
          });
        });
      }
    };
  });
