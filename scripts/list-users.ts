import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const users = await sql`SELECT id, email, name FROM users ORDER BY created_at`;
  console.log(JSON.stringify(users, null, 2));
}

main().catch(console.error);
