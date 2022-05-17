import { graphql, list } from '@keystone-6/core'
import { relationship, text, virtual } from '@keystone-6/core/fields'
import { snakeCase } from 'lodash'

import { hasApiKey, isAdmin } from '../utils/access'
import { Lists } from '.keystone/types'

export const Tag: Lists['Tag'] = list({
  // access: {
  //   operation: {
  //     query: hasApiKey,
  //     create: isAdmin,
  //     update: isAdmin,
  //     delete: isAdmin,
  //   },
  // },
  ui: {
    isHidden: true,
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      db: { isNullable: false },
    }),
    slug: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(parent) {
          return snakeCase(parent.name)
        },
      }),
    }),
    projects: relationship({ ref: 'Project.tags', many: true }),
  },
})
