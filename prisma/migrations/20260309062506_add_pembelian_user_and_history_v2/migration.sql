-- CreateTable
CREATE TABLE `PembelianUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `paketPembelianId` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'OVERDUE') NOT NULL,
    `expiredDuration` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoryPembelian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `paketPembelianId` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'OVERDUE') NOT NULL,
    `expiredDuration` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PembelianUser` ADD CONSTRAINT `PembelianUser_paketPembelianId_fkey` FOREIGN KEY (`paketPembelianId`) REFERENCES `PaketPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryPembelian` ADD CONSTRAINT `HistoryPembelian_paketPembelianId_fkey` FOREIGN KEY (`paketPembelianId`) REFERENCES `PaketPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
