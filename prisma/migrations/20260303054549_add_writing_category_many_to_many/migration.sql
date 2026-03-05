-- CreateTable
CREATE TABLE `WritingCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `timer` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_WritingToWritingCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_WritingToWritingCategory_AB_unique`(`A`, `B`),
    INDEX `_WritingToWritingCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_WritingToWritingCategory` ADD CONSTRAINT `_WritingToWritingCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Writing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WritingToWritingCategory` ADD CONSTRAINT `_WritingToWritingCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `WritingCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
