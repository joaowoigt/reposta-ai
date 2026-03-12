import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ── Enums ──

export const planEnum = pgEnum("plan", ["free", "creator", "pro"]);

export const platformEnum = pgEnum("platform", [
  "x",
  "linkedin",
  "instagram",
  "newsletter",
]);

// ── NextAuth tables ──

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  name: text("name"),
  image: text("image"),
  plan: planEnum("plan").default("free").notNull(),
  asaasCustomerId: text("asaas_customer_id"),
  asaasSubscriptionId: text("asaas_subscription_id"),
  generationsThisMonth: integer("generations_this_month").default(0).notNull(),
  generationsResetAt: timestamp("generations_reset_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ── App tables ──

export const generations = pgTable("generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  batchId: uuid("batch_id").notNull(),
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
