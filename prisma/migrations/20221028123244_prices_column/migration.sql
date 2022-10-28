/*
  Warnings:

  - Added the required column `price` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `price` INTEGER NOT NULL;
