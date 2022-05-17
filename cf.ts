// 3000 is standard for node apps

import { env } from './utils/env'

export const isProd = () => env('NODE_ENV') === 'production'
export const isDev = () => !isProd()

// git remote add azure https://dev-rayat.scm.azurewebsites.net/dev-rayat.git
