/*
  Warnings:

  - The values [ESSAY,SHORT_ANSWER] on the enum `SoalSpeaking_jenis` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `SoalSpeaking` MODIFY `jenis` ENUM('MENIRU', 'MENJAWAB') NOT NULL;
