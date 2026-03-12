ALTER TABLE "users" RENAME COLUMN "stripe_customer_id" TO "asaas_customer_id";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "asaas_subscription_id" text;
