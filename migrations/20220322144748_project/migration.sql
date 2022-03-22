-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "demo" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',
    "source" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
