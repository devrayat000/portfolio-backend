-- CreateEnum
CREATE TYPE "AdminRankType" AS ENUM ('full_stack', 'front_end', 'back_end');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "rank" "AdminRankType" DEFAULT E'front_end';
