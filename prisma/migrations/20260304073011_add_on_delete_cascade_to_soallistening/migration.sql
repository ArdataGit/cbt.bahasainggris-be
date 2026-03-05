-- DropForeignKey
ALTER TABLE `SoalListeing` DROP FOREIGN KEY `SoalListeing_listeingId_fkey`;

-- AddForeignKey
ALTER TABLE `SoalListeing` ADD CONSTRAINT `SoalListeing_listeingId_fkey` FOREIGN KEY (`listeingId`) REFERENCES `Listening`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
