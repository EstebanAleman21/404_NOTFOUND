/*
  Warnings:

  - You are about to drop the column `categories` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `category` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isValid` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categories` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "categories",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "isValid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "category",
ADD COLUMN     "categories" TEXT NOT NULL;
