-- CreateTable
CREATE TABLE `SpeakingCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `timer` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Speaking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `audioUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SoalSpeaking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speakingId` INTEGER NOT NULL,
    `jenis` ENUM('ESSAY', 'SHORT_ANSWER') NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerSpeaking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soalSpeakingId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SpeakingToSpeakingCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SpeakingToSpeakingCategory_AB_unique`(`A`, `B`),
    INDEX `_SpeakingToSpeakingCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoalSpeaking` ADD CONSTRAINT `SoalSpeaking_speakingId_fkey` FOREIGN KEY (`speakingId`) REFERENCES `Speaking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerSpeaking` ADD CONSTRAINT `AnswerSpeaking_soalSpeakingId_fkey` FOREIGN KEY (`soalSpeakingId`) REFERENCES `SoalSpeaking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SpeakingToSpeakingCategory` ADD CONSTRAINT `_SpeakingToSpeakingCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Speaking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SpeakingToSpeakingCategory` ADD CONSTRAINT `_SpeakingToSpeakingCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `SpeakingCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
