/*
  Warnings:

  - You are about to drop the column `adminId` on the `Company` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Company" ("cnpj", "email", "id", "name", "password") SELECT "cnpj", "email", "id", "name", "password" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
