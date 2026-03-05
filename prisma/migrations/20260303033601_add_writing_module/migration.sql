-- CreateTable
CREATE TABLE `Writing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SoalWriting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `writingId` INTEGER NOT NULL,
    `jenis` ENUM('ESSAY', 'SHORT_ANSWER') NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerWriting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soalWritingId` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoalWriting` ADD CONSTRAINT `SoalWriting_writingId_fkey` FOREIGN KEY (`writingId`) REFERENCES `Writing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerWriting` ADD CONSTRAINT `AnswerWriting_soalWritingId_fkey` FOREIGN KEY (`soalWritingId`) REFERENCES `SoalWriting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
