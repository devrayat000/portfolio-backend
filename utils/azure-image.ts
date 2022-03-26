import { azureStorageImage } from "@k6-contrib/fields-azure";

export function azureImage<T>() {
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
