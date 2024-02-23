/*
  Warnings:

  - Added the required column `direccion` to the `Housing_complex` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Housing_complex" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "number_of_houses" TEXT NOT NULL,
    "administrator" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Housing_complex" ("administrator", "createdAt", "description", "id", "name", "number_of_houses", "phone") SELECT "administrator", "createdAt", "description", "id", "name", "number_of_houses", "phone" FROM "Housing_complex";
DROP TABLE "Housing_complex";
ALTER TABLE "new_Housing_complex" RENAME TO "Housing_complex";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
