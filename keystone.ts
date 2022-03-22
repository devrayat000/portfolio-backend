// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { config } from "@keystone-6/core";
import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";
import { lists } from "./schema";
import { env } from "./utils/env";

import { PORT, DATABASE_URL, SESSION_MAX_AGE, SESSION_SECRET } from "./config";

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

// We wrap our config using the withAuth function. This will inject all
// the extra config required to add support for authentication in our system.
export default withAuth(
  config({
    db: {
      provider: "postgresql",
      useMigrations: true,
      url: DATABASE_URL,
      enableLogging: env("NODE_ENV") !== "production",
      idField: { kind: "cuid" },
    },
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: { port: PORT },
    lists,
    // We add our session configuration to the system here.
    session,
    images: {
      upload: "local",
      local: {
        baseUrl: "/images",
        storagePath: "public/images",
      },
    },
    graphql: {
      playground: env("NODE_ENV") !== "production",
    },
  })
);
