import { cloudinaryImage as cloudinaryStorageImage } from '@keystone-6/cloudinary'
import { type ImageFieldConfig } from '@keystone-6/core/fields'
import { type BaseListTypeInfo } from '@keystone-6/core/types'

import { env } from './env'

export function cloudinaryImage<T extends BaseListTypeInfo>(
  config?: ImageFieldConfig<T>
) {
  return cloudinaryStorageImage<T>({
    cloudinary: {
      cloudName: env('CLOUDINARY_CLOUD_NAME'),
      apiKey: env('CLOUDINARY_API_KEY'),
      apiSecret: env('CLOUDINARY_API_SECRET'),
      folder: env('CLOUDINARY_API_FOLDER'),
    },
    ...config,
  })
}

export { cloudinaryImage as image }
