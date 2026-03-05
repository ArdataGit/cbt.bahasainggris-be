/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Paket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Paket` DROP COLUMN `updatedAt`,
    ALTER COLUMN `createdAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `_ListeningCategoryToPaket` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListeningCategoryToPaket_AB_unique`(`A`, `B`),
    INDEX `_ListeningCategoryToPaket_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaketToReadingCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaketToReadingCategory_AB_unique`(`A`, `B`),
    INDEX `_PaketToReadingCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaketToWritingCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaketToWritingCategory_AB_unique`(`A`, `B`),
    INDEX `_PaketToWritingCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaketToSpeakingCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaketToSpeakingCategory_AB_unique`(`A`, `B`),
    INDEX `_PaketToSpeakingCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ListeningCategoryToPaket` ADD CONSTRAINT `_ListeningCategoryToPaket_A_fkey` FOREIGN KEY (`A`) REFERENCES `ListeningCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListeningCategoryToPaket` ADD CONSTRAINT `_ListeningCategoryToPaket_B_fkey` FOREIGN KEY (`B`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToReadingCategory` ADD CONSTRAINT `_PaketToReadingCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToReadingCategory` ADD CONSTRAINT `_PaketToReadingCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `ReadingCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToWritingCategory` ADD CONSTRAINT `_PaketToWritingCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToWritingCategory` ADD CONSTRAINT `_PaketToWritingCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `WritingCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToSpeakingCategory` ADD CONSTRAINT `_PaketToSpeakingCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToSpeakingCategory` ADD CONSTRAINT `_PaketToSpeakingCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `SpeakingCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
