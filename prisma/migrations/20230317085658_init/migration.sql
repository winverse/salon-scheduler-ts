-- CreateTable
CREATE TABLE "Workhours" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "close_interval" INTEGER NOT NULL,
    "is_day_off" BOOLEAN NOT NULL,
    "key" TEXT NOT NULL,
    "open_interval" INTEGER NOT NULL,
    "weekday" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "begin_at" INTEGER NOT NULL,
    "end_at" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
