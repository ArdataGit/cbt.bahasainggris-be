-- AlterTable
ALTER TABLE `HistoryPembelian` ADD COLUMN `amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `merchantRef` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PembelianUser` ADD COLUMN `amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `merchantRef` VARCHAR(191) NULL;
