import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("Renaming stripe_customer_id → asaas_customer_id...");
  await sql`ALTER TABLE "users" RENAME COLUMN "stripe_customer_id" TO "asaas_customer_id"`;

  console.log("Adding asaas_subscription_id column...");
  await sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "asaas_subscription_id" text`;

  console.log("Migration complete!");
}

main().catch(console.error);
