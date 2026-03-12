import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

async function main() {
  const plan = process.argv[2] || "free";
  const email = process.argv[3] || "joaowoigt@gmail.com";

  const sql = neon(process.env.DATABASE_URL!);

  const result = await sql`
    UPDATE users
    SET plan = ${plan},
        asaas_customer_id = NULL,
        asaas_subscription_id = NULL,
        updated_at = NOW()
    WHERE email = ${email}
    RETURNING email, plan
  `;

  if (result.length === 0) {
    console.log(`User ${email} not found`);
  } else {
    console.log(`Updated: ${result[0].email} → plan: ${result[0].plan}`);
  }
}

main().catch(console.error);
