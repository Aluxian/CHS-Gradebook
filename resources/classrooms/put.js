// Must be logged in
cancelUnless(me, "You must be logged in", 401);

// Must own the classroom
cancelUnless(this.teacherId === me.id, "You don't own this classroom", 401);

// Check for duplicate students
if (changed('students')) {
    for (var i = 0; i < this.students.length; i++) {
        var student1 = this.students[i];
        for (var j = i+1; j < this.students.length; j++) {
            var student2 = this.students[j];
            cancelIf(student1.name === student2.name || student1.email === student2.email, "This student is already in your classroom");
        }
    }
}