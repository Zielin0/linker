/*
  Warnings:

  - Added the required column `views` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "views" INTEGER NOT NULL;
