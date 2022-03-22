-- CreateTable
CREATE TABLE "_Project_images" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Project_images_AB_unique" ON "_Project_images"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_images_B_index" ON "_Project_images"("B");

-- AddForeignKey
ALTER TABLE "_Project_images" ADD FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_images" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
