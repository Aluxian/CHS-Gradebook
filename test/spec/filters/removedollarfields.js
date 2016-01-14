'use strict';

describe('Filter: removeDollarFields', function () {

  // load the filter's module
  beforeEach(module('gradebookApp'));

  // initialize a new instance of the filter before each test
  var removeDollarFields;
  beforeEach(inject(function ($filter) {
    removeDollarFields = $filter('removeDollarFields');
  }));

  it('should return the input prefixed with "removeDollarFields filter:"', function () {
    var text = 'angularjs';
    expect(removeDollarFields(text)).toBe('removeDollarFields filter: ' + text);
  });

});
