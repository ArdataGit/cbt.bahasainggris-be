/*
  Warnings:

  - You are about to drop the column `answer` on the `UserListeningHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalListeningId` on the `UserListeningHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalListeningOptionId` on the `UserListeningHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalSpeakingId` on the `UserSpeakingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalSpeakingOptionId` on the `UserSpeakingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalWritingId` on the `UserWritingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `soalWritingOptionId` on the `UserWritingHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserListeningHistory` DROP COLUMN `answer`,
    DROP COLUMN `soalListeningId`,
    DROP COLUMN `soalListeningOptionId`;

-- AlterTable
ALTER TABLE `UserSpeakingHistory` DROP COLUMN `soalSpeakingId`,
    DROP COLUMN `soalSpeakingOptionId`;

-- AlterTable
ALTER TABLE `UserWritingHistory` DROP COLUMN `soalWritingId`,
    DROP COLUMN `soalWritingOptionId`;

-- AddForeignKey
ALTER TABLE `UserReadingHistory` ADD CONSTRAINT `UserReadingHistory_userDataId_fkey` FOREIGN KEY (`userDataId`) REFERENCES `DataUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReadingHistory` ADD CONSTRAINT `UserReadingHistory_readingId_fkey` FOREIGN KEY (`readingId`) REFERENCES `Reading`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserListeningHistory` ADD CONSTRAINT `UserListeningHistory_userDataId_fkey` FOREIGN KEY (`userDataId`) REFERENCES `DataUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserListeningHistory` ADD CONSTRAINT `UserListeningHistory_listeningId_fkey` FOREIGN KEY (`listeningId`) REFERENCES `Listening`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWritingHistory` ADD CONSTRAINT `UserWritingHistory_userDataId_fkey` FOREIGN KEY (`userDataId`) REFERENCES `DataUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWritingHistory` ADD CONSTRAINT `UserWritingHistory_writingId_fkey` FOREIGN KEY (`writingId`) REFERENCES `Writing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSpeakingHistory` ADD CONSTRAINT `UserSpeakingHistory_userDataId_fkey` FOREIGN KEY (`userDataId`) REFERENCES `DataUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSpeakingHistory` ADD CONSTRAINT `UserSpeakingHistory_speakingId_fkey` FOREIGN KEY (`speakingId`) REFERENCES `Speaking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
