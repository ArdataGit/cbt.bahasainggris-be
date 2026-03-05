-- AlterTable
ALTER TABLE `DataUser` ADD COLUMN `paketId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `DataUser_paketId_fkey` ON `DataUser`(`paketId`);

-- AddForeignKey
ALTER TABLE `DataUser` ADD CONSTRAINT `DataUser_paketId_fkey` FOREIGN KEY (`paketId`) REFERENCES `Paket`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
