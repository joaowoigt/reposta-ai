import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE users SET plan = 'free', asaas_customer_id = NULL, asaas_subscription_id = NULL, updated_at = NOW() WHERE email = 'joaowoigt@gmail.com'`;
  const result = await sql`SELECT email, plan, asaas_customer_id, asaas_subscription_id FROM users WHERE email = 'joaowoigt@gmail.com'`;
  console.log("Resetado:", JSON.stringify(result[0], null, 2));
}

main().catch(console.error);
