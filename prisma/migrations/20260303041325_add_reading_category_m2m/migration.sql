-- AlterTable
ALTER TABLE `Reading` MODIFY `content` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `ReadingCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `timer` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ReadingToReadingCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ReadingToReadingCategory_AB_unique`(`A`, `B`),
    INDEX `_ReadingToReadingCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ReadingToReadingCategory` ADD CONSTRAINT `_ReadingToReadingCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Reading`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReadingToReadingCategory` ADD CONSTRAINT `_ReadingToReadingCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `ReadingCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
