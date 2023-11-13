-- CreateTable
CREATE TABLE "StudentAdvantages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "advantageId" TEXT NOT NULL,
    CONSTRAINT "StudentAdvantages_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentAdvantages_advantageId_fkey" FOREIGN KEY ("advantageId") REFERENCES "Advantage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
