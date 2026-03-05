/*
  Warnings:

  - You are about to drop the `Listeing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SoalListeing` DROP FOREIGN KEY `SoalListeing_listeingId_fkey`;

-- DropTable
DROP TABLE `Listeing`;

-- CreateTable
CREATE TABLE `Listening` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `audioUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoalListeing` ADD CONSTRAINT `SoalListeing_listeingId_fkey` FOREIGN KEY (`listeingId`) REFERENCES `Listening`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
