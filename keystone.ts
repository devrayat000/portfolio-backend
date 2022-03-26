// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { config } from "@keystone-6/core";
import { lists } from "./schema";

import { PORT, DATABASE_URL } from "./config";
import { withAuth, session } from "./auth";

// We wrap our config using the withAuth function. This will inject all
// the extra config required to add support for authentication in our system.
export default withAuth(
  config({
    db: {
      provider: "postgresql",
      useMigrations: true,
      url: DATABASE_URL,
      enableLogging: process.env.NODE_ENV !== "production",
      idField: { kind: "cuid" },
    },
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: {
      port: PORT,
      cors: {
        credentials: true,
        origin: ["http://localhost:3000", "https://www.devrayat.me"],
      },
    },
    lists,
    // We add our session configuration to the system here.
    session,
    images: {
      upload: "cloud",
      local: {
        baseUrl: "/images",
        storagePath: "public/images",
      },
    },
    graphql: {
      playground: process.env.NODE_ENV !== "production",
      cors: {
        credentials: true,
        origin: ["http://localhost:3000", "https://www.devrayat.me"],
      },
    },
  })
);
