/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `SoalListeing` table. All the data in the column will be lost.
  - You are about to drop the column `optionA` on the `SoalListeing` table. All the data in the column will be lost.
  - You are about to drop the column `optionB` on the `SoalListeing` table. All the data in the column will be lost.
  - You are about to drop the column `optionC` on the `SoalListeing` table. All the data in the column will be lost.
  - You are about to drop the column `optionD` on the `SoalListeing` table. All the data in the column will be lost.
  - You are about to drop the column `optionE` on the `SoalListeing` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswer` on the `SoalReading` table. All the data in the column will be lost.
  - You are about to drop the column `optionA` on the `SoalReading` table. All the data in the column will be lost.
  - You are about to drop the column `optionB` on the `SoalReading` table. All the data in the column will be lost.
  - You are about to drop the column `optionC` on the `SoalReading` table. All the data in the column will be lost.
  - You are about to drop the column `optionD` on the `SoalReading` table. All the data in the column will be lost.
  - You are about to drop the column `optionE` on the `SoalReading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Listening` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `SoalListeing` DROP COLUMN `correctAnswer`,
    DROP COLUMN `optionA`,
    DROP COLUMN `optionB`,
    DROP COLUMN `optionC`,
    DROP COLUMN `optionD`,
    DROP COLUMN `optionE`,
    MODIFY `question` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `SoalReading` DROP COLUMN `correctAnswer`,
    DROP COLUMN `optionA`,
    DROP COLUMN `optionB`,
    DROP COLUMN `optionC`,
    DROP COLUMN `optionD`,
    DROP COLUMN `optionE`,
    MODIFY `question` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `ReadingOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soalReadingId` INTEGER NOT NULL,
    `text` TEXT NOT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ListeningOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soalListeingId` INTEGER NOT NULL,
    `text` TEXT NOT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReadingOption` ADD CONSTRAINT `ReadingOption_soalReadingId_fkey` FOREIGN KEY (`soalReadingId`) REFERENCES `SoalReading`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListeningOption` ADD CONSTRAINT `ListeningOption_soalListeingId_fkey` FOREIGN KEY (`soalListeingId`) REFERENCES `SoalListeing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
