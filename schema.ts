// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { list } from "@keystone-6/core";
import {
  password,
  relationship,
  text,
  timestamp,
  image,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

import { Lists } from ".keystone/types";

export const lists: Lists = {
  Admin: list({
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
      images: relationship({
        ref: "Image",
        many: true,
        ui: {
          displayMode: "select",
          labelField: "label",
        },
      }),
    },
  }),
  Image: list({
    fields: {
      label: text(),
      image: image(),
    },
  }),
};
