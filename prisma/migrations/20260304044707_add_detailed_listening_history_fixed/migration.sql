-- CreateTable
CREATE TABLE `UserSoalListeningHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userListeningHistoryId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserListeningOptionHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userListeningHistoryId` INTEGER NOT NULL,
    `listeningOptionId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSoalListeningHistory` ADD CONSTRAINT `UserSoalListeningHistory_userListeningHistoryId_fkey` FOREIGN KEY (`userListeningHistoryId`) REFERENCES `UserListeningHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserListeningOptionHistory` ADD CONSTRAINT `UserListeningOptionHistory_userListeningHistoryId_fkey` FOREIGN KEY (`userListeningHistoryId`) REFERENCES `UserListeningHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserListeningOptionHistory` ADD CONSTRAINT `UserListeningOptionHistory_listeningOptionId_fkey` FOREIGN KEY (`listeningOptionId`) REFERENCES `ListeningOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
