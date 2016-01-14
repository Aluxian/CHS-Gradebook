'use strict';

angular.module('gradebookApp', [
  'ui.bootstrap.accordion',
  'ui.bootstrap.dropdownToggle',
  'ui.bootstrap.modal',
  'ui.bootstrap.tabs',
  'ui.bootstrap.tpls',
  'ngGrid',
  'ngRoute'
])
  // Constants
  .constant('RolePaths', {
    teacher: '/teacher/classrooms',
    student: '/student/classrooms',
    parent: '/parent/classrooms'
  })
  .constant('MenuItems', {
    teacher: [
      { name: 'Classrooms', href: '#/teacher/classrooms' }
    ],
    student: [
      { name: 'Classrooms', href: '#/student/classrooms' },
      { name: 'Parents', href: '#/student/parents' }
    ],
    parent: [
      { name: 'Classrooms', href: '#/parent/classrooms' }
    ]
  })

  // Routes
  .config(function ($routeProvider) {
    $routeProvider
      // Main
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        requireNotLoggedIn: true
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        requireNotLoggedIn: true
      })
      // Teacher
      .when('/teacher/classrooms', {
        templateUrl: 'views/teacher/classrooms.html',
        controller: 'TeacherClassroomsCtrl',
        requiredRole: 'teacher',
        resolve: {
          classrooms: function($q, dpd) {
            var deferred = $q.defer();

            dpd.classrooms.get(function(result, error) {
              deferred.resolve(result, error);
            });

            return deferred.promise;
          }
        }
      })
      .when('/teacher/classroom/:id', {
        templateUrl: 'views/teacher/classroom.html',
        controller: 'TeacherClassroomCtrl',
        requiredRole: 'teacher',
        reloadOnSearch: false,
        resolve: {
          classroom: function($q, $route, dpd) {
            var deferred = $q.defer();

            dpd.classrooms.get($route.current.params.id, function(result, error) {
              deferred.resolve(result, error);
            });

            return deferred.promise;
          }
        }
      })
      // Student
      .when('/student/classrooms', {
        templateUrl: 'views/student/classrooms.html',
        controller: 'StudentClassroomsCtrl',
        requiredRole: 'student',
        resolve: {
          classrooms: function($q, dpd) {
            var deferred = $q.defer();

            dpd.classrooms.get(function(result, error) {
              deferred.resolve(result, error);
            });

            return deferred.promise;
          }
        }
      })
      .when('/student/classroom/:id', {
        templateUrl: 'views/student/classroom.html',
        controller: 'StudentClassroomCtrl',
        requiredRole: 'student',
        reloadOnSearch: false,
        resolve: {
          classroom: function($q, $route, dpd) {
            var deferred = $q.defer();

            dpd.classrooms.get($route.current.params.id, function(result, error) {
              deferred.resolve(result, error);
            });

            return deferred.promise;
          }
        }
      })
      .when('/student/parents', {
        templateUrl: 'views/student/parents.html',
        controller: 'StudentParentsCtrl',
        requiredRole: 'student'
      })
      // Parent
      .when('/parent/classrooms', {
        templateUrl: 'views/parent/classrooms.html',
        controller: 'ParentClassroomsCtrl',
        requiredRole: 'parent',
        reloadOnSearch: false,
        resolve: {
          students: function($q, dpd) {
            var deferred = $q.defer();

            dpd.users.get({ type: 'student' }, function(result, error) {
              deferred.resolve(result, error);
            });

            return deferred.promise;
          }
        }
      })
      .when('/parent/classroom/:studentId/:id', {
        templateUrl: 'views/parent/classroom.html',
        controller: 'ParentClassroomCtrl',
        requiredRole: 'parent',
        resolve: {
          student: function($q, $route, dpd) {
            var deferred = $q.defer();

            dpd.users.get($route.current.params.studentId, function(student, error) {
              if (error) { deferred.resolve(student, error); }
              dpd.classrooms.get({ id: $route.current.params.id, studentEmail: student.email }, function(cr, error) {
                student.classroom = cr;
                delete student.classrooms;
                deferred.resolve(student, error);
              });
            });

            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  // Security (auth)
  .run(function ($rootScope, $location, AuthService, RolePaths) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      var user = AuthService.getUser();

      if (!user && next.requiredRole) {
        event.preventDefault();
        $location.path('/signin').replace();
      }

      if (user && (next.requireNotLoggedIn || (next.requiredRole !== undefined && next.requiredRole !== user.type))) {
        $location.path(RolePaths[user.type]).replace();
      }
    });
  });
