// Must be logged in
cancelUnless(me, "You must be logged in", 401);

// Must own the account
cancelUnless(isMe(query.id), "This is not your account", 401);