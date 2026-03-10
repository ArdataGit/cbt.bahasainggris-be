-- AlterTable
ALTER TABLE `DataUser` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `HistoryPembelian` ADD COLUMN `bank` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PembelianUser` ADD COLUMN `bank` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserListeningHistory` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `UserReadingHistory` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `UserSpeakingHistory` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `UserWritingHistory` ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `DataUser_userId_fkey` ON `DataUser`(`userId`);

-- CreateIndex
CREATE INDEX `UserListeningHistory_userId_fkey` ON `UserListeningHistory`(`userId`);

-- CreateIndex
CREATE INDEX `UserReadingHistory_userId_fkey` ON `UserReadingHistory`(`userId`);

-- CreateIndex
CREATE INDEX `UserSpeakingHistory_userId_fkey` ON `UserSpeakingHistory`(`userId`);

-- CreateIndex
CREATE INDEX `UserWritingHistory_userId_fkey` ON `UserWritingHistory`(`userId`);

-- AddForeignKey
ALTER TABLE `DataUser` ADD CONSTRAINT `DataUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReadingHistory` ADD CONSTRAINT `UserReadingHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserListeningHistory` ADD CONSTRAINT `UserListeningHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWritingHistory` ADD CONSTRAINT `UserWritingHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSpeakingHistory` ADD CONSTRAINT `UserSpeakingHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
