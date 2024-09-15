/*
  Warnings:

  - You are about to drop the column `category` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "category",
ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "account_id" TEXT,
ADD COLUMN     "categories" TEXT[];
