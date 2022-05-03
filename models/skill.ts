import { list } from '@keystone-6/core'
import { integer, select, text } from '@keystone-6/core/fields'

import { Lists } from '.keystone/types'

import { hasApiKey, isAdmin } from '../utils/access'

export const Skill: Lists['Skill'] = list({
  // access: {
  //   operation: {
  //     query: hasApiKey,
  //     create: isAdmin,
  //     update: isAdmin,
  //     delete: isAdmin,
  //   },
  // },
  fields: {
    type: select({
      type: 'enum',
      db: { isNullable: false },
      defaultValue: 'dev',
      options: [
        { label: 'Language', value: 'lang' },
        { label: 'Development', value: 'dev' },
      ],
    }),
    label: text({
      validation: { isRequired: true },
      db: { isNullable: false },
    }),
    value: integer({
      defaultValue: 100,
      db: { isNullable: false },
      validation: { isRequired: true, min: 0, max: 100 },
    }),
  },
})
