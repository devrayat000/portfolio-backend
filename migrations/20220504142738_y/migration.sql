-- CreateEnum
CREATE TYPE "AdminFreelanceType" AS ENUM ('available', 'unavailable');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 20,
ADD COLUMN     "freelance" "AdminFreelanceType" DEFAULT E'available',
ADD COLUMN     "residence" TEXT NOT NULL DEFAULT E'';
