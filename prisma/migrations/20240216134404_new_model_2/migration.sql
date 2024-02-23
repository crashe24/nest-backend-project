-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Owner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "identification" TEXT NOT NULL DEFAULT '',
    "house" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "housing_complex_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Owner" ("createdAt", "email", "fullName", "house", "housing_complex_id", "id", "phone") SELECT "createdAt", "email", "fullName", "house", "housing_complex_id", "id", "phone" FROM "Owner";
DROP TABLE "Owner";
ALTER TABLE "new_Owner" RENAME TO "Owner";
CREATE UNIQUE INDEX "Owner_fullName_house_key" ON "Owner"("fullName", "house");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
