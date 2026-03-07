-- AlterTable
ALTER TABLE `Setting` ADD COLUMN `listeningInstructions` LONGTEXT NULL,
    ADD COLUMN `readingInstructions` LONGTEXT NULL,
    ADD COLUMN `speakingInstructions` LONGTEXT NULL,
    ADD COLUMN `writingInstructions` LONGTEXT NULL;
