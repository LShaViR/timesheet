/*
  Warnings:

  - You are about to drop the column `projectId` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Timesheet` table. All the data in the column will be lost.
  - Added the required column `project_id` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Timesheet" DROP CONSTRAINT "Timesheet_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Timesheet" DROP CONSTRAINT "Timesheet_userId_fkey";

-- AlterTable
ALTER TABLE "Timesheet" DROP COLUMN "projectId",
DROP COLUMN "userId",
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
