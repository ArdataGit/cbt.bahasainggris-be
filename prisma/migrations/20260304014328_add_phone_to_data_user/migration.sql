-- CreateTable
CREATE TABLE `DataUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserReadingHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userDataId` INTEGER NOT NULL,
    `readingId` INTEGER NOT NULL,
    `soalReadingId` INTEGER NOT NULL,
    `soalReadingOptionId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserListeningHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userDataId` INTEGER NOT NULL,
    `listeningId` INTEGER NOT NULL,
    `soalListeningId` INTEGER NOT NULL,
    `soalListeningOptionId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWritingHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userDataId` INTEGER NOT NULL,
    `writingId` INTEGER NOT NULL,
    `soalWritingId` INTEGER NOT NULL,
    `soalWritingOptionId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSpeakingHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userDataId` INTEGER NOT NULL,
    `speakingId` INTEGER NOT NULL,
    `soalSpeakingId` INTEGER NOT NULL,
    `soalSpeakingOptionId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
