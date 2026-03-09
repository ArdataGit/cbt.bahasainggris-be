-- AddForeignKey
ALTER TABLE `PembelianUser` ADD CONSTRAINT `PembelianUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryPembelian` ADD CONSTRAINT `HistoryPembelian_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
