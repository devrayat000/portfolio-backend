import { Lists } from '.keystone/types'
import { list } from '@keystone-6/core'
import { text, timestamp } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { hasApiKey, isAdmin } from '../utils/access'

export const Education: Lists['Education'] = list({
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
    passed: timestamp({ db: { isNullable: false } }),
    certificate: text(),
    description: document({
      formatting: true,
      links: true,
      dividers: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
    }),
  },
})
