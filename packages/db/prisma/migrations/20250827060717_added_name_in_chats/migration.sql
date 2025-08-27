/*
  Warnings:

  - Added the required column `name` to the `Chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Chats" ADD COLUMN     "name" TEXT NOT NULL;
