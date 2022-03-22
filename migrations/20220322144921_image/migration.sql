-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT E'',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_mode" TEXT,
    "image_id" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
