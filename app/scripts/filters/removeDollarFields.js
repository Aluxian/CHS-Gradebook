'use strict';

angular.module('gradebookApp')
  .filter('removeDollarFields', function () {
    return function (array) {
      array.forEach(function(obj) {
        Object.keys(obj).forEach(function(key) {
          if (key.indexOf('$') === 0) {
            delete obj[key];
          }
        });
      });
    };
  });
