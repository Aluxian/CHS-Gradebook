'use strict';

angular.module('gradebookApp')
  .controller('TeacherClassroomsCtrl', function ($scope, $modal, AuthService, MenuItems, classrooms) {

    $scope.user = AuthService.getUser();
    $scope.menuLinks = MenuItems[$scope.user.type];
    $scope.classrooms = classrooms;

    $scope.openCreateClassroomModal = function () {
      $modal.open({
        templateUrl: 'views/teacher/modal-createClassroom.html',
        controller: 'CreateClassroomModalCtrl'
      });
    };

  });
