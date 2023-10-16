-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "schoolId" TEXT NOT NULL,
    "rg" TEXT NOT NULL DEFAULT '21.333.333',
    "address" TEXT NOT NULL DEFAULT 'Belo Horizonte',
    "major" TEXT NOT NULL DEFAULT 'Engenharia de software',
    CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("coins", "cpf", "email", "id", "name", "password", "schoolId") SELECT "coins", "cpf", "email", "id", "name", "password", "schoolId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
