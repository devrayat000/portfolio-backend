/*
  Warnings:

  - You are about to drop the `_Admin_languageSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Admin_languageSkills" DROP CONSTRAINT "_Admin_languageSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_Admin_languageSkills" DROP CONSTRAINT "_Admin_languageSkills_B_fkey";

-- AlterTable
ALTER TABLE "LanguageSkill" ADD COLUMN     "user" TEXT;

-- DropTable
DROP TABLE "_Admin_languageSkills";

-- CreateIndex
CREATE INDEX "LanguageSkill_user_idx" ON "LanguageSkill"("user");

-- AddForeignKey
ALTER TABLE "LanguageSkill" ADD CONSTRAINT "LanguageSkill_user_fkey" FOREIGN KEY ("user") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
