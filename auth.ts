// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";

import { SESSION_MAX_AGE, SESSION_SECRET } from "./config";

// createAuth configures signin functionality based on the config below. Note this only implements
// authentication, i.e signing in as an item using identity and secret fields in a list. Session
// management and access control are controlled independently in the main keystone config.
const { withAuth } = createAuth({
  // This is the list that contains items people can sign in as
  listKey: "Admin",
  // The identity field is typically a username or email address
  identityField: "email",
  sessionData: "id email",

  // The secret field must be a password type field
  secretField: "password",
  // initFirstItem turns on the "First User" experience, which prompts you to create a new user
  // when there are no items in the list yet
  initFirstItem: {
    // These fields are collected in the "Create First User" form
    fields: ["name", "email", "password"],
    skipKeystoneWelcome: true,
  },
});

// Stateless sessions will store the listKey and itemId of the signed-in user in a cookie.
// This session object will be made available on the context object used in hooks, access-control,
// resolvers, etc.
const session = statelessSessions({
  maxAge: SESSION_MAX_AGE,
  // The session secret is used to encrypt cookie data (should be an environment variable)
  secret: SESSION_SECRET,
});

export { session, withAuth };
