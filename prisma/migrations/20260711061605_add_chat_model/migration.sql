-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'gemini-2.5-flash';

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "model" TEXT;
