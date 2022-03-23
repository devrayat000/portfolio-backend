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
  select,
  integer,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { azureStorageImage } from "@k6-contrib/fields-azure";

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
      image: azureImage(),
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
  Service: list({
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
      details: text({
        validation: { isRequired: true },
        db: { isNullable: false },
      }),
      image: azureImage(),
    },
  }),
  Skill: list({
    access: {
      operation: {
        query: hasApiKey,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    fields: {
      type: select({
        type: "enum",
        db: { isNullable: false },
        defaultValue: "dev",
        options: [
          { label: "Language", value: "lang" },
          { label: "Development", value: "dev" },
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
  }),
  Education: list({
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
  }),
};

function azureImage<T>() {
  return azureStorageImage<T>({
    azureStorageConfig: {
      azureStorageOptions: {
        accessKey: process.env.AZURE_STORAGE_KEY || "",
        account: process.env.AZURE_STORAGE_ACCOUNT || "",
        container: process.env.AZURE_STORAGE_CONTAINER || "",
        url: process.env.AZURE_STORAGE_ACCOUNT_HOST
          ? `${process.env.AZURE_STORAGE_ACCOUNT_HOST}${process.env.AZURE_STORAGE_ACCOUNT_NAME}`
          : undefined,
      },
    },
  });
}

// psql --host devrayat-portfolio.postgres.database.azure.com --user devRayat@devrayat-portfolio --port=5432 --dbname postgres
// postgres://devRayat@devrayat-portfolio:rayatIsAwesome10050!@devrayat-portfolio.postgres.database.azure.com:5432/portfolio
