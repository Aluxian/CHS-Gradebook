// Must be logged in
cancelUnless(me, "You must be logged in", 401);

// Must own the classroom
cancelUnless(this.teacherId === me.id, "You don't own this classroom", 401);