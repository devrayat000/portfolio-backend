import { list } from '@keystone-6/core'
import { text, timestamp } from '@keystone-6/core/fields'
import { hasApiKey, isAdmin } from '../utils/access'
import { azureImage } from '../utils/azure-image'
import { Lists } from '.keystone/types'

export const Image: Lists['Image'] = list({
  // access: {
  //   operation: {
  //     query: hasApiKey,
  //     create: isAdmin,
  //     update: isAdmin,
  //     delete: isAdmin,
  //   },
  // },
  fields: {
    label: text(),
    image: azureImage(),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
})
