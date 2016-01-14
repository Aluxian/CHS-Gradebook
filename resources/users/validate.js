// Validate type
cancelIf(['teacher', 'student', 'parent'].indexOf(this.type) === -1, "Invalid user type");

// Must be unique
dpd.users.get({
    email: this.email
}, function(result) {
    cancelIf(result.length, "This email has been already taken");
});