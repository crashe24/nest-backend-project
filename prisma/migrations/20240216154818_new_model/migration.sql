/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,housing_complex_id,year,month]` on the table `Aliquot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Aliquot_ownerId_housing_complex_id_year_month_key" ON "Aliquot"("ownerId", "housing_complex_id", "year", "month");
