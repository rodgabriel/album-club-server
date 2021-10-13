/*
  Warnings:

  - You are about to drop the `_ClubToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClubToUser" DROP CONSTRAINT "_ClubToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubToUser" DROP CONSTRAINT "_ClubToUser_B_fkey";

-- DropTable
DROP TABLE "_ClubToUser";

-- CreateTable
CREATE TABLE "ClubToUser" (
    "userId" INTEGER NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "ClubToUser_pkey" PRIMARY KEY ("userId","clubId")
);

-- AddForeignKey
ALTER TABLE "ClubToUser" ADD CONSTRAINT "ClubToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubToUser" ADD CONSTRAINT "ClubToUser_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
