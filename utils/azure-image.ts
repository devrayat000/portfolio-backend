import { azureStorageImage } from '@k6-contrib/fields-azure'

export function azureImage<T>() {
  const key = process.env.AZURE_STORAGE_KEY,
    account = process.env.AZURE_STORAGE_ACCOUNT,
    container = process.env.AZURE_STORAGE_CONTAINER,
    host = process.env.AZURE_STORAGE_ACCOUNT_HOST
  return azureStorageImage<T>({
    azureStorageConfig: {
      azureStorageOptions: {
        accessKey: key,
        account: account,
        container: container,
        url: host && `${host}/${account}`,
      },
    },
  })
}
