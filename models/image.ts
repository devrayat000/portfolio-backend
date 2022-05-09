import { list } from '@keystone-6/core'
import { text, timestamp } from '@keystone-6/core/fields'

import { hasApiKey, isAdmin } from '../utils/access'
import { Lists } from '.keystone/types'
import { image } from '../utils/image'

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
    label: text({
      validation: { isRequired: true },
      db: { isNullable: false },
    }),
    image: image(),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
})
