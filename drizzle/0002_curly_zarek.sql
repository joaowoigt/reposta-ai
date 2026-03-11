ALTER TABLE "generations" ADD COLUMN "batch_id" uuid;
UPDATE "generations" SET "batch_id" = gen_random_uuid() WHERE "batch_id" IS NULL;
ALTER TABLE "generations" ALTER COLUMN "batch_id" SET NOT NULL;