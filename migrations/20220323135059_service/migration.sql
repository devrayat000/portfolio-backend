-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "details" TEXT NOT NULL DEFAULT E'',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_mode" TEXT,
    "image_id" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
