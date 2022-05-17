import { Lists } from '.keystone/types'
import { list } from '@keystone-6/core'
import {
  integer,
  password,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields'
// import { document } from '@keystone-6/fields-document'
// import { hasApiKey, isAdmin } from '../utils/access'

export const Admin: Lists['Admin'] = list({
  // access: {
  //   operation: {
  //     query: isAdmin,
  //     create: isAdmin,
  //     update: isAdmin,
  //     delete: isAdmin,
  //   },
  // },
  fields: {
    name: text({
      validation: { isRequired: true },
      db: { isNullable: false },
    }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      db: { isNullable: false },
    }),
    password: password({
      validation: { isRequired: true, length: { min: 8, max: 32 } },
      db: { isNullable: false },
    }),
    age: integer({
      validation: { isRequired: true },
      defaultValue: 20,
      db: { isNullable: false },
    }),
    residence: text({
      // validation: { isRequired: true },
      // db: { isNullable: false },
    }),
    freelance: select({
      type: 'enum',
      label: 'Availability',
      ui: { displayMode: 'segmented-control' },
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Unavailable', value: 'unavailable' },
      ],
      defaultValue: 'available',
    }),
    address: text(),
    languageSkills: relationship({
      ref: 'LanguageSkill.user',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['language', 'value', 'type'],
        inlineEdit: { fields: ['language', 'value', 'type'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['language', 'value', 'type'] },
      },
    }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
})
