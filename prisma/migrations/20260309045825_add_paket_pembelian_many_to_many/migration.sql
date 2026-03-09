-- CreateTable
CREATE TABLE `PaketPembelian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `label` ENUM('FREE', 'PREMIUM', 'VIP') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaketToPaketPembelian` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaketToPaketPembelian_AB_unique`(`A`, `B`),
    INDEX `_PaketToPaketPembelian_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PaketToPaketPembelian` ADD CONSTRAINT `_PaketToPaketPembelian_A_fkey` FOREIGN KEY (`A`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToPaketPembelian` ADD CONSTRAINT `_PaketToPaketPembelian_B_fkey` FOREIGN KEY (`B`) REFERENCES `PaketPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
