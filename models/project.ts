import { list } from '@keystone-6/core'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import { Lists } from '.keystone/types'
import { Prisma } from '.prisma/client'

import { hasApiKey, isAdmin } from '../utils/access'

export const Project: Lists['Project'] = list({
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
    demo: text(),
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
    source: text(),
    status: select({
      type: 'enum',
      defaultValue: 'draft',
      ui: { displayMode: 'segmented-control' },
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      hooks: {
        async beforeOperation({ operation, item, context, resolvedData }) {
          if (
            operation === 'update' &&
            (resolvedData as Prisma.ProjectUpdateInput).status === 'published'
          ) {
            context.query.Project.updateOne({
              data: { publishedAt: new Date() },
              where: { id: item.id },
            })
          }
        },
        async afterOperation({ operation, item, context, resolvedData }) {
          if (
            operation === 'create' &&
            (resolvedData as Prisma.ProjectUpdateInput).status === 'published'
          ) {
            context.query.Project.updateOne({
              data: { publishedAt: new Date() },
              where: { id: item.id },
            })
          }
        },
      },
    }),
    tags: relationship({
      ref: 'Tag.projects',
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
      many: true,
    }),
    images: relationship({
      ref: 'Image',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'label'],
        inlineEdit: { fields: ['image', 'label'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['image', 'label'] },
      },
    }),
    publishedAt: timestamp(),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
})
