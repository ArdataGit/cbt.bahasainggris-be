/*
  Warnings:

  - You are about to drop the column `provinceCity` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `provinceCity`,
    ADD COLUMN `cityId` VARCHAR(191) NULL,
    ADD COLUMN `cityName` VARCHAR(191) NULL,
    ADD COLUMN `provinceId` VARCHAR(191) NULL,
    ADD COLUMN `provinceName` VARCHAR(191) NULL;
