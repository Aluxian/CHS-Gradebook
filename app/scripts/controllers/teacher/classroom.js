'use strict';

angular.module('gradebookApp')
  .controller('TeacherClassroomCtrl', function ($scope, $modal, $timeout, $location, AuthService, RolePaths, MenuItems, classroom, dpd) {

    $scope.saveText = 'Save';
    $scope.deleteText = 'Delete Class';
    $scope.saveGradebookText = 'Save';

    $scope.user = AuthService.getUser();
    $scope.menuLinks = MenuItems[$scope.user.type];
    $scope.cr = classroom;

    $scope.activeTabs = {
      administration: {
        main: false,
        info: false,
        students: false
      },
      gradebook: {
        main: false
      },
      attendance: {
        main: false
      }
    };

    var activeTab = $location.search().tab;
    var activeSubtab = $location.search().subtab;
    if (activeTab) {
      $scope.activeTabs[activeTab].main = true;
    }
    if (activeSubtab) {
      $scope.activeTabs[activeTab || 'administration'][activeSubtab] = true;
    }

    $scope.selectTab = function(tab) {
      $location.search('tab', tab).replace();
    };

    $scope.selectSubtab = function(subtab) {
      $location.search('subtab', subtab).replace();
    };

    $scope.saveClass = function () {
      if ($scope.saveText !== 'Save') {
        return;
      }

      $scope.saveText = 'Saving...';

      dpd.classrooms.put($scope.cr, function(result, error) {
        // TODO: Handle error

        $timeout(function() {
          $scope.saveText = 'Saved!';
        });

        $timeout(function() {
          $scope.saveText = 'Save';
        }, 2000);
      });
    };

    $scope.deleteClass = function() {
      if ($scope.deleteText !== 'Delete Class') {
        return;
      }

      $scope.deleteText = 'Deleting...';

      dpd.classrooms.del($scope.cr.id, function(result, error) {
        // TODO: Handle error

        $timeout(function() {
          $location.path(RolePaths[$scope.user.type]);
        });
      });
    };

    $scope.openAddStudentModal = function() {
      $modal.open({
        templateUrl: 'views/teacher/modal-addStudent.html',
        controller: 'AddStudentModalCtrl',
        resolve: {
          classroom: function() {
            return $scope.cr;
          }
        }
      });
    };

    $scope.removeStudent = function(delStudent) {
      $scope.cr.students.forEach(function(student, index, students) {
        if (student.email === delStudent.email) {
          students.splice(index, 1);
        }
      });

      dpd.classrooms.put($scope.cr.id, {students: $scope.cr.students}, function(result, error) {
        // TODO: Handle error
      });
    };

    $scope.saveGradebook = function() {
      if ($scope.saveGradebookText !== 'Save') {
        return;
      }

      $scope.saveGradebookText = 'Saving...';

      dpd.classrooms.put($scope.cr, function(result, error) {
        // TODO: Handle error

        $timeout(function() {
          $scope.saveGradebookText = 'Saved!';
        });

        $timeout(function() {
          $scope.saveGradebookText = 'Save';
        }, 2000);
      });
    };

    var cellEditableTemplate = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model=\"COL_FIELD\" ng-change="updateEntity(col, row, COL_FIELD)" />';

    $scope.gridOptions = {
      data: 'cr.students',
      enableCellSelection: true,
      enableRowSelection: false,
      enableCellEditOnFocus: true,
      columnDefs: [
        { field: 'name', displayName: 'Student', enableCellEdit: false },
        { field: 'grades.grade', displayName: 'Grade', enableCellEdit: false },
        { field: 'grades.test1', displayName: 'Test 1', editableCellTemplate: cellEditableTemplate },
        { field: 'grades.homework1', displayName: 'Homework 1', editableCellTemplate: cellEditableTemplate },
        { field: 'grades.test2', displayName: 'Test 2', editableCellTemplate: cellEditableTemplate },
        { field: 'grades.homework2', displayName: 'Homework 2', editableCellTemplate: cellEditableTemplate }
      ]
    };

    $scope.updateEntity = function(col, row, val) {
      var gds = $scope.cr.students[row.rowIndex].grades;
      var avg = (parseInt(gds.test1) + parseInt(gds.homework1) + parseInt(gds.test2) + parseInt(gds.homework2)) / 4;

      if (avg >= 90) {
        gds.grade = 'A';
      } else if (avg >= 80) {
        gds.grade = 'B';
      } else if (avg >= 70) {
        gds.grade = 'C';
      } else if (avg >= 60) {
        gds.grade = 'D';
      } else {
        gds.grade = 'F';
      }
    };

  });
