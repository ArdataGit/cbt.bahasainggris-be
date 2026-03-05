-- AlterTable
ALTER TABLE `UserWritingHistory` MODIFY `answer` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `UserSoalWritingHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userWritingHistoryId` INTEGER NOT NULL,
    `soalWritingId` INTEGER NOT NULL,
    `answer` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UserSoalWritingHistory_userWritingHistoryId_fkey`(`userWritingHistoryId`),
    INDEX `UserSoalWritingHistory_soalWritingId_fkey`(`soalWritingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSoalWritingHistory` ADD CONSTRAINT `UserSoalWritingHistory_userWritingHistoryId_fkey` FOREIGN KEY (`userWritingHistoryId`) REFERENCES `UserWritingHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSoalWritingHistory` ADD CONSTRAINT `UserSoalWritingHistory_soalWritingId_fkey` FOREIGN KEY (`soalWritingId`) REFERENCES `SoalWriting`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
