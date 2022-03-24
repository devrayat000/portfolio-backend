/*
  Warnings:

  - You are about to drop the column `image_mode` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `image_mode` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "image_mode";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "image_mode";
