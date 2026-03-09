-- AlterTable
ALTER TABLE `Paket` ADD COLUMN `paketCategoryId` INTEGER NULL,
    ADD COLUMN `subPaketCategoryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `PaketCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubPaketCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paketCategoryId` INTEGER NOT NULL,
    `subCategoryName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `SubPaketCategory_paketCategoryId_fkey`(`paketCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Paket_paketCategoryId_fkey` ON `Paket`(`paketCategoryId`);

-- CreateIndex
CREATE INDEX `Paket_subPaketCategoryId_fkey` ON `Paket`(`subPaketCategoryId`);

-- AddForeignKey
ALTER TABLE `Paket` ADD CONSTRAINT `Paket_paketCategoryId_fkey` FOREIGN KEY (`paketCategoryId`) REFERENCES `PaketCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paket` ADD CONSTRAINT `Paket_subPaketCategoryId_fkey` FOREIGN KEY (`subPaketCategoryId`) REFERENCES `SubPaketCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubPaketCategory` ADD CONSTRAINT `SubPaketCategory_paketCategoryId_fkey` FOREIGN KEY (`paketCategoryId`) REFERENCES `PaketCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
