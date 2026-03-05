-- DropForeignKey
ALTER TABLE `AnswerWriting` DROP FOREIGN KEY `AnswerWriting_soalWritingId_fkey`;

-- DropForeignKey
ALTER TABLE `SoalReading` DROP FOREIGN KEY `SoalReading_readingId_fkey`;

-- DropForeignKey
ALTER TABLE `SoalSpeaking` DROP FOREIGN KEY `SoalSpeaking_speakingId_fkey`;

-- DropForeignKey
ALTER TABLE `SoalWriting` DROP FOREIGN KEY `SoalWriting_writingId_fkey`;

-- AddForeignKey
ALTER TABLE `SoalReading` ADD CONSTRAINT `SoalReading_readingId_fkey` FOREIGN KEY (`readingId`) REFERENCES `Reading`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SoalWriting` ADD CONSTRAINT `SoalWriting_writingId_fkey` FOREIGN KEY (`writingId`) REFERENCES `Writing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerWriting` ADD CONSTRAINT `AnswerWriting_soalWritingId_fkey` FOREIGN KEY (`soalWritingId`) REFERENCES `SoalWriting`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SoalSpeaking` ADD CONSTRAINT `SoalSpeaking_speakingId_fkey` FOREIGN KEY (`speakingId`) REFERENCES `Speaking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
