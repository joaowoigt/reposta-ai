import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`SELECT email, plan, asaas_customer_id, asaas_subscription_id FROM users WHERE email = 'joaowoigt@gmail.com'`;
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
