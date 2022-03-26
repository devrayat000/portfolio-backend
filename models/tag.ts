import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { hasApiKey, isAdmin } from "../utils/access";
import { Lists } from ".keystone/types";

export const Tag: Lists["Tag"] = list({
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
});
