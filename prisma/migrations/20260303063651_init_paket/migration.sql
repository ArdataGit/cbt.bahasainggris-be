-- CreateTable
CREATE TABLE `Paket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ListeningToPaket` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListeningToPaket_AB_unique`(`A`, `B`),
    INDEX `_ListeningToPaket_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaketToReading` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaketToReading_AB_unique`(`A`, `B`),
    INDEX `_PaketToReading_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaketToWriting` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaketToWriting_AB_unique`(`A`, `B`),
    INDEX `_PaketToWriting_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaketToSpeaking` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaketToSpeaking_AB_unique`(`A`, `B`),
    INDEX `_PaketToSpeaking_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ListeningToPaket` ADD CONSTRAINT `_ListeningToPaket_A_fkey` FOREIGN KEY (`A`) REFERENCES `Listening`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListeningToPaket` ADD CONSTRAINT `_ListeningToPaket_B_fkey` FOREIGN KEY (`B`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToReading` ADD CONSTRAINT `_PaketToReading_A_fkey` FOREIGN KEY (`A`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToReading` ADD CONSTRAINT `_PaketToReading_B_fkey` FOREIGN KEY (`B`) REFERENCES `Reading`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToWriting` ADD CONSTRAINT `_PaketToWriting_A_fkey` FOREIGN KEY (`A`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToWriting` ADD CONSTRAINT `_PaketToWriting_B_fkey` FOREIGN KEY (`B`) REFERENCES `Writing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToSpeaking` ADD CONSTRAINT `_PaketToSpeaking_A_fkey` FOREIGN KEY (`A`) REFERENCES `Paket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaketToSpeaking` ADD CONSTRAINT `_PaketToSpeaking_B_fkey` FOREIGN KEY (`B`) REFERENCES `Speaking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
