'use strict';

angular.module('gradebookApp')
  .service('AuthService', function Authservice() {
    this.user = window.currentUser;

    this.setUser = function(user) {
      this.user = user;
    };

    this.getUser = function() {
      return this.user || '';
    };

  });
