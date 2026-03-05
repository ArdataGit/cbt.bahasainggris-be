/*
  Warnings:

  - Added the required column `jenis` to the `Speaking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Speaking` ADD COLUMN `jenis` ENUM('MENIRU', 'MENJAWAB') NOT NULL;
