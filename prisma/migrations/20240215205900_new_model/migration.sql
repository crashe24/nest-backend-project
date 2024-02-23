/*
  Warnings:

  - A unique constraint covering the columns `[fullName,house]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Owner_fullName_house_key" ON "Owner"("fullName", "house");
