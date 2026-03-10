import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const planEnum = pgEnum("plan", ["free", "creator", "pro"]);

export const platformEnum = pgEnum("platform", [
  "x",
  "linkedin",
  "instagram",
  "newsletter",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  plan: planEnum("plan").default("free").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  generationsThisMonth: integer("generations_this_month").default(0).notNull(),
  generationsResetAt: timestamp("generations_reset_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const generations = pgTable("generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  inputText: text("input_text").notNull(),
  inputUrl: text("input_url"),
  platform: platformEnum("platform").notNull(),
  outputText: text("output_text").notNull(),
  tokensUsed: integer("tokens_used").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
