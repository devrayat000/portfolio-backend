-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "passed" TIMESTAMP(3) NOT NULL,
    "certificate" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);
