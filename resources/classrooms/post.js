// Must be logged in
cancelUnless(me, "You must be logged in", 401);

// Assign owner id
this.teacherId = me.id;