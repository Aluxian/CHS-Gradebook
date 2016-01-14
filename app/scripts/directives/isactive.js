'use strict';

angular.module('gradebookApp')
  .directive('isActive', function ($location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        if (attrs.isActive === '#' + $location.path()) {
          element.addClass('active');
        }
      }
    };
  });
