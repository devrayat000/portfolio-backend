// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth
import 'dotenv/config'
import { config } from '@keystone-6/core'

import { lists } from './schema'
import { isDev } from './cf'
import { withAuth, session } from './auth'
import { env } from './utils/env'

// We wrap our config using the withAuth function. This will inject all
// the extra config required to add support for authentication in our system.
export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      useMigrations: true,
      url: env(
        'DATABASE_URL',
        'postgresql://postgres:ppooii12@localhost/portfolio'
      ),
      enableLogging: isDev(),
      idField: { kind: 'cuid' },
    },
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: context => !!context.session?.data,
    },
    server: {
      port: env.int('PORT', 8000),
      cors: {
        credentials: true,
        origin: [
          'http://localhost:3000',
          'https://www.devrayat.me',
          'https://devrayat.me',
        ],
      },
    },
    lists,
    // We add our session configuration to the system here.
    session,
    images: {
      upload: 'cloud',
      local: {
        baseUrl: '/images',
        storagePath: 'public/images',
      },
    },
    graphql: {
      cors: {
        credentials: false,
        origin: [
          'http://localhost:3000',
          'https://devrayat.me',
          'https://www.devrayat.me',
        ],
      },
    },
  })
)
// https://railway.app/new/template?template=https://github.com/devRayat/portfolio-backend&envs=AZURE_STORAGE_ACCOUNT,AZURE_STORAGE_CONTAINER,AZURE_STORAGE_KEY,DATABASE_URL,SESSION_SECRET&optionalEnvs=SESSION_SECRET&SESSION_SECRETDesc=A+secret+key+for+verifying+the+integrity+of+signed+cookies&referralCode=keystonejs
