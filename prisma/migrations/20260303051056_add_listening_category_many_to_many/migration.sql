-- CreateTable
CREATE TABLE `ListeningCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `timer` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ListeningToListeningCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListeningToListeningCategory_AB_unique`(`A`, `B`),
    INDEX `_ListeningToListeningCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ListeningToListeningCategory` ADD CONSTRAINT `_ListeningToListeningCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Listening`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListeningToListeningCategory` ADD CONSTRAINT `_ListeningToListeningCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `ListeningCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
