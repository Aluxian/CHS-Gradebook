// Must be logged in
cancelUnless(me, "You must be logged in", 401);

// Must own the classroom (if teacher)
if (me.type === 'teacher') {
    cancelUnless(this.teacherId === me.id, "You don't own this classroom", 401);
}

// If student or parent, hide classroom unless 'me' belongs to it
else {
    var self = this;
    cancelUnless(meBelongsToClassroom(), "You don't belong to this class", 401);
}

function meBelongsToClassroom() {
    var belongs = false;
    self.students.forEach(function(student) {
        if (student.email === me.email || student.email === query.studentEmail) {
            return belongs = true;
        }
    });
    return belongs;
}