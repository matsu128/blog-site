-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "imageUrl" DROP NOT NULL;

UPDATE "Post" SET "imageUrl" = '' WHERE "imageUrl" IS NULL;
