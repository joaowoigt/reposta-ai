import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const email = process.argv[2];
if (!email) {
  console.error("Usage: npx tsx scripts/delete-user.ts <email>");
  process.exit(1);
}

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Cascade delete: accounts, sessions, generations are ON DELETE CASCADE
  const result = await sql`DELETE FROM users WHERE email = ${email} RETURNING email, name`;

  if (result.length === 0) {
    console.log(`User com email ${email} não encontrado.`);
  } else {
    console.log(`Deletado: ${result[0].name} (${result[0].email})`);
  }
}

main().catch(console.error);
