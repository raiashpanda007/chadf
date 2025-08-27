/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Sender" AS ENUM ('USER', 'MODEL');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "storage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Chats" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Messages" (
    "id" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "sender" "public"."Sender" NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Chats" ADD CONSTRAINT "Chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
