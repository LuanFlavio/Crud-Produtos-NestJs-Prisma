/*
  Warnings:

  - Added the required column `usuarioId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produtos` ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
