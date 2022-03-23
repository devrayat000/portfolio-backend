-- CreateEnum
CREATE TYPE "SkillTypeType" AS ENUM ('lang', 'dev');

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "type" "SkillTypeType" NOT NULL DEFAULT E'dev',
    "label" TEXT NOT NULL DEFAULT E'',
    "value" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);
