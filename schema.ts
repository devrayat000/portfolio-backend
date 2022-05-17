// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { list } from '@keystone-6/core'
import {
  integer,
  text,
  timestamp,
  select,
  relationship,
} from '@keystone-6/core/fields'

import { Lists } from '.keystone/types'

import { hasApiKey, isAdmin } from './utils/access'
import { Project } from './models/project'
import { Image } from './models/image'
import { Tag } from './models/tag'
import { Education } from './models/education'
import { Skill } from './models/skill'
import { Service } from './models/service'
import { Admin } from './models/admin'

// @ts-ignore
export const lists: Lists = {
  Admin,
  LanguageSkill: list({
    fields: {
      language: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        db: { isNullable: false },
      }),
      value: integer({
        validation: { isRequired: true, min: 0, max: 100 },
        defaultValue: 50,
        db: { isNullable: false },
      }),
      type: select({
        type: 'enum',
        label: 'Language Type',
        ui: { displayMode: 'segmented-control' },
        options: [
          { label: 'Programming', value: 'programming' },
          { label: 'Human', value: 'human' },
        ],
        defaultValue: 'programming',
      }),
      user: relationship({
        ref: 'Admin.languageSkills',
      }),
    },
  }),
  ApiKey: list({
    // access: {
    //   operation: {
    //     query: isAdmin,
    //     create: isAdmin,
    //     update: isAdmin,
    //     delete: isAdmin,
    //   },
    // },
    fields: {
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),
  Project,
  Image,
  Tag,
  Service,
  Skill,
  Education,
}
