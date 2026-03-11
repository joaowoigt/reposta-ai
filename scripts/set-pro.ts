import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error("Uso: npx tsx scripts/set-pro.ts <email>");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const [user] = await db
    .select({ id: users.id, email: users.email, plan: users.plan })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    console.error(`Usuário com email ${email} não encontrado.`);
    process.exit(1);
  }

  console.log(`Encontrado: ${user.email} (plan: ${user.plan})`);

  await db
    .update(users)
    .set({ plan: "pro", updatedAt: new Date() })
    .where(eq(users.id, user.id));

  console.log(`Plano atualizado para PRO. Gerações ilimitadas.`);
}

main();
