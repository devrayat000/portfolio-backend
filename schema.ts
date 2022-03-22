// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { list } from "@keystone-6/core";
import {
  checkbox,
  password,
  relationship,
  text,
  timestamp,
  select,
} from "@keystone-6/core/fields";

export const lists = {
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
};
