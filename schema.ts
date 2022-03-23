// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { list } from "@keystone-6/core";
import {
  password,
  relationship,
  text,
  timestamp,
  image,
  virtual,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

import { Lists } from ".keystone/types";
import { hasApiKey, isAdmin } from "./utils/access";

export const lists: Lists = {
  Admin: list({
    access: {
      operation: {
        query: isAdmin,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        db: { isNullable: false },
      }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        db: { isNullable: false },
      }),
      password: password({
        validation: { isRequired: true, length: { min: 8, max: 32 } },
        db: { isNullable: false },
      }),
      createdAt: timestamp({ defaultValue: { kind: "now" } }),
    },
  }),
  Project: list({
    access: {
      operation: {
        query: hasApiKey,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
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
      tags: relationship({
        ref: "Tag.projects",
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] },
        },
        many: true,
      }),
      images: relationship({
        ref: "Image",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["image"],
          inlineEdit: { fields: ["image"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["image"] },
        },
      }),
      createdAt: timestamp({ defaultValue: { kind: "now" } }),
    },
  }),
  Image: list({
    access: {
      operation: {
        query: hasApiKey,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    fields: {
      label: text(),
      image: image(),
      createdAt: timestamp({ defaultValue: { kind: "now" } }),
    },
  }),
  Tag: list({
    access: {
      operation: {
        query: hasApiKey,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    ui: {
      isHidden: true,
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        db: { isNullable: false },
      }),
      projects: relationship({ ref: "Project.tags", many: true }),
    },
  }),
  ApiKey: list({
    access: {
      operation: {
        query: isAdmin,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    fields: {
      createdAt: timestamp({ defaultValue: { kind: "now" } }),
    },
  }),
};
