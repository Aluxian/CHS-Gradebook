'use strict';

describe('Controller: StudentclassroomsCtrl', function () {

  // load the controller's module
  beforeEach(module('gradebookApp'));

  var StudentclassroomsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentclassroomsCtrl = $controller('StudentclassroomsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
