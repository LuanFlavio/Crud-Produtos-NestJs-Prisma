/*
  Warnings:

  - You are about to alter the column `valor` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `produtos` MODIFY `valor` DOUBLE NOT NULL;
