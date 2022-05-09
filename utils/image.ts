import { cloudinaryImage as cloudinaryStorageImage } from '@keystone-6/cloudinary'
import {
  image as baseImage,
  type ImageFieldConfig,
} from '@keystone-6/core/fields'
import { type BaseListTypeInfo } from '@keystone-6/core/types'

import { isProd } from './env'

export function image<T extends BaseListTypeInfo>(
  config?: ImageFieldConfig<T>
) {
  return isProd() ? baseImage<T>(config) : cloudinaryImage<T>(config)
}

export function cloudinaryImage<T extends BaseListTypeInfo>(
  config?: ImageFieldConfig<T>
) {
  return cloudinaryStorageImage<T>({
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      folder: process.env.CLOUDINARY_API_FOLDER,
    },
    ...config,
  })
}
