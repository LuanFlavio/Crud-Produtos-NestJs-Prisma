/*
  Warnings:

  - Added the required column `cargo` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `cargo` VARCHAR(191) NOT NULL;
