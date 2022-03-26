-- CreateEnum
CREATE TYPE "ProjectStatusType" AS ENUM ('published', 'draft');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "status" "ProjectStatusType" DEFAULT E'draft';
