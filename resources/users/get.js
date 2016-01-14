// Must be logged in
cancelUnless(me, "You must be logged in", 401);

// Must own the account or be a parent of a student
var self = this;
if (me.type === 'parent' && self.type === 'student' && isAParentOf()) {
    dpd.classrooms.get({ studentEmail: self.email }, function(result, err) {
        self.classrooms = result;
    });
} else {
    cancelUnless(isMe(query.id), "This is not your account", 401);
}

function isAParentOf() {
    if (!self.parents) return false;
    var isParent = false;
    self.parents.forEach(function(parent) {
        if (me.email === parent.email) {
            isParent = true;
        }
    });
    return isParent;
}