-- CreateTable
CREATE TABLE `Listeing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `audioUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SoalListeing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listeingId` INTEGER NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `optionA` VARCHAR(191) NOT NULL,
    `optionB` VARCHAR(191) NOT NULL,
    `optionC` VARCHAR(191) NULL,
    `optionD` VARCHAR(191) NULL,
    `optionE` VARCHAR(191) NULL,
    `correctAnswer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoalListeing` ADD CONSTRAINT `SoalListeing_listeingId_fkey` FOREIGN KEY (`listeingId`) REFERENCES `Listeing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
