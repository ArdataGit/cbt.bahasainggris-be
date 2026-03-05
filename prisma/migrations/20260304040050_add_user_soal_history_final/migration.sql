/*
  Warnings:

  - You are about to drop the column `answer` on the `UserReadingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalReadingId` on the `UserReadingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalReadingOptionId` on the `UserReadingHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserReadingHistory` DROP COLUMN `answer`,
    DROP COLUMN `soalReadingId`,
    DROP COLUMN `soalReadingOptionId`;

-- CreateTable
CREATE TABLE `UserSoalReadingHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userReadingHistoryId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserReadingOptionHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userReadingHistoryId` INTEGER NOT NULL,
    `readingOptionId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSoalReadingHistory` ADD CONSTRAINT `UserSoalReadingHistory_userReadingHistoryId_fkey` FOREIGN KEY (`userReadingHistoryId`) REFERENCES `UserReadingHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReadingOptionHistory` ADD CONSTRAINT `UserReadingOptionHistory_userReadingHistoryId_fkey` FOREIGN KEY (`userReadingHistoryId`) REFERENCES `UserReadingHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReadingOptionHistory` ADD CONSTRAINT `UserReadingOptionHistory_readingOptionId_fkey` FOREIGN KEY (`readingOptionId`) REFERENCES `ReadingOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
