/*
  Warnings:

  - You are about to alter the column `alias` on the `Link` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "alias" SET DATA TYPE VARCHAR(15);
