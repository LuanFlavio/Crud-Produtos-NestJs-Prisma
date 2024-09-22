-- CreateTable
CREATE TABLE `produtos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
