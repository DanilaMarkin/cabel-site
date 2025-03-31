-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cost` VARCHAR(191) NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `article` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `features` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
