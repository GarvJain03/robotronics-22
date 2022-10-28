/*
  Warnings:

  - You are about to drop the `query` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `query`;

-- CreateTable
CREATE TABLE `ContactQuery` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
