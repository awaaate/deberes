/*
  Warnings:

  - You are about to drop the `_TagToTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TagToTask";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TagsOnTasks" (
    "taskId" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "asignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("taskId", "tagName"),
    CONSTRAINT "TagsOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnTasks_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
