/*
  Warnings:

  - You are about to drop the column `age` on the `LanguageSkill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LanguageSkill" DROP COLUMN "age",
ADD COLUMN     "value" INTEGER NOT NULL DEFAULT 50;
