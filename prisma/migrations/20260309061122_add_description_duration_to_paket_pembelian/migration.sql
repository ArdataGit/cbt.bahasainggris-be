-- AlterTable
ALTER TABLE `PaketPembelian` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 0;
