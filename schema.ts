// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { list } from "@keystone-6/core";
import { password, text, timestamp } from "@keystone-6/core/fields";

import { Lists } from ".keystone/types";

import { hasApiKey, isAdmin } from "./utils/access";
import { Project } from "./models/project";
import { Image } from "./models/image";
import { Tag } from "./models/tag";
import { Education } from "./models/education";
import { Skill } from "./models/skill";
import { Service } from "./models/service";

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
  Project,
  Image,
  Tag,
  Service,
  Skill,
  Education,
};
