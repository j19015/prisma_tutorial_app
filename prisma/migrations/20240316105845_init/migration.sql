-- CreateTable
CREATE TABLE "calendars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "borderColor" TEXT NOT NULL
);
