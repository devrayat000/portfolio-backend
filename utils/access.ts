import { KeystoneContextFromListTypeInfo } from "@keystone-6/core/types";
import { Lists } from ".keystone/types";

interface Param {
  context: KeystoneContextFromListTypeInfo<
    | Lists.Project.TypeInfo
    | Lists.Image.TypeInfo
    | Lists.Tag.TypeInfo
    | Lists.ApiKey.TypeInfo
    | Lists.Admin.TypeInfo
    | Lists.Service.TypeInfo
    | Lists.Skill.TypeInfo
    | Lists.Education.TypeInfo
  >;
}
interface Param2 extends Param {
  session?: {
    data?: {
      id: string;
      email: string;
    };
  };
}

export const hasApiKey = async ({ context }: Param) => {
  if (isSameDomain({ context })) {
    return true;
  }
  const recievedKey = context.req.headers["x-api-key"] as string;

  const apiKey = await context.db.ApiKey.findOne({
    where: { id: recievedKey },
  });

  return !!apiKey.id;
};

export const isSameDomain = ({ context }: Param) => {
  const current = context.req.headers.host;
  const requestUrl = new URL("/", context.req.headers.origin);

  console.log(current);
  console.log(requestUrl.host);

  return current === requestUrl.host;
};

export const isAdmin = ({ session }: Param2) => {
  return !!session?.data;
};
