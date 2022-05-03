import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'

import { Lists } from '.keystone/types'

import { hasApiKey, isAdmin } from '../utils/access'
import { azureImage } from '../utils/azure-image'

export const Service: Lists['Service'] = list({
  // access: {
  //   operation: {
  //     query: hasApiKey,
  //     create: isAdmin,
  //     update: isAdmin,
  //     delete: isAdmin,
  //   },
  // },
  fields: {
    title: text({
      validation: { isRequired: true },
      db: { isNullable: false },
    }),
    details: text({
      validation: { isRequired: true },
      db: { isNullable: false },
    }),
    image: azureImage(),
  },
})
