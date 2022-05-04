-- CreateEnum
CREATE TYPE "LanguageSkillTypeType" AS ENUM ('programming', 'human');

-- CreateTable
CREATE TABLE "LanguageSkill" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT E'',
    "age" INTEGER NOT NULL DEFAULT 50,
    "type" "LanguageSkillTypeType" DEFAULT E'programming',

    CONSTRAINT "LanguageSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Admin_languageSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LanguageSkill_language_key" ON "LanguageSkill"("language");

-- CreateIndex
CREATE UNIQUE INDEX "_Admin_languageSkills_AB_unique" ON "_Admin_languageSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_Admin_languageSkills_B_index" ON "_Admin_languageSkills"("B");

-- AddForeignKey
ALTER TABLE "_Admin_languageSkills" ADD FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Admin_languageSkills" ADD FOREIGN KEY ("B") REFERENCES "LanguageSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
