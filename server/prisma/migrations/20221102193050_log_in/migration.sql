-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "about" TEXT,
    "pasword" TEXT NOT NULL DEFAULT 'pasword',
    "verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("about", "email", "id", "name") SELECT "about", "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
