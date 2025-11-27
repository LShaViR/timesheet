/*
  Warnings:

  - You are about to drop the column `orgId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `TMember` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TMember` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `saturday_duration` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - Added the required column `org_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `TMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `TMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_orgId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TMember" DROP CONSTRAINT "TMember_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TMember" DROP CONSTRAINT "TMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_orgId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "orgId",
DROP COLUMN "teamId",
ADD COLUMN     "org_id" TEXT NOT NULL,
ADD COLUMN     "team_id" TEXT;

-- AlterTable
ALTER TABLE "TMember" DROP COLUMN "teamId",
DROP COLUMN "userId",
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "orgId",
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Timesheet" DROP COLUMN "saturday_duration",
ADD COLUMN     "satarday_duration" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "displayName",
ADD COLUMN     "display_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TMember" ADD CONSTRAINT "TMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TMember" ADD CONSTRAINT "TMember_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
