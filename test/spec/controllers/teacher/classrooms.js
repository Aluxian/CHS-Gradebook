'use strict';

describe('Controller: TeacherclassroomsCtrl', function () {

  // load the controller's module
  beforeEach(module('gradebookApp'));

  var TeacherclassroomsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeacherclassroomsCtrl = $controller('TeacherclassroomsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
