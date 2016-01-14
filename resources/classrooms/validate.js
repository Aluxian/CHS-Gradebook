// Must be logged in
cancelUnless(me, "You must be logged in", 401);

// Name must be unique
if (changed('name')) {
    dpd.classrooms.get({
        teacherId: me.id,
        name: this.name
    }, function(result) {
        cancelIf(result.length, "You already have a classroom with this name");
    });
}