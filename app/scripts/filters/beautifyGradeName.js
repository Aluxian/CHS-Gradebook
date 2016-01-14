'use strict';

angular.module('gradebookApp')
  .filter('beautifyGradeName', function() {
    return function(input) {
      return {
        grade: 'Final Grade',
        test1: 'Test 1',
        homework1: 'Homework 1',
        test2: 'Test 2',
        homework2: 'Homework 2'
      }[input];
    };
  });
