/*
  Warnings:

  - You are about to drop the column `orgId` on the `User` table. All the data in the column will be lost.
  - Added the required column `org_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_orgId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "orgId",
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
