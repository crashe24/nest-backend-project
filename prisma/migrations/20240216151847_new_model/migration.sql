/*
  Warnings:

  - Added the required column `housing_complex_id` to the `Aliquot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aliquot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    "housing_complex_id" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Aliquot_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aliquot" ("createdAt", "description", "id", "month", "ownerId", "value", "year") SELECT "createdAt", "description", "id", "month", "ownerId", "value", "year" FROM "Aliquot";
DROP TABLE "Aliquot";
ALTER TABLE "new_Aliquot" RENAME TO "Aliquot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
