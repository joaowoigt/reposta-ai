import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb } from "@/lib/db";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema";
import { sendWelcomeEmail } from "@/lib/email/send";

const authConfig = () =>
  NextAuth({
    adapter: DrizzleAdapter(getDb(), {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      session({ session, user }) {
        session.user.id = user.id;
        session.user.plan = (user as typeof user & { plan: string }).plan as
          | "free"
          | "creator"
          | "pro";
        return session;
      },
    },
    events: {
      async createUser({ user }) {
        if (user.email) {
          await sendWelcomeEmail(user.email, user.name || user.email);
        }
      },
    },
  });

type AuthReturn = ReturnType<typeof authConfig>;

let _instance: AuthReturn | null = null;

function getInstance(): AuthReturn {
  if (!_instance) {
    _instance = authConfig();
  }
  return _instance;
}

export const handlers = {
  GET: ((...args: Parameters<AuthReturn["handlers"]["GET"]>) =>
    getInstance().handlers.GET(...args)) as AuthReturn["handlers"]["GET"],
  POST: ((...args: Parameters<AuthReturn["handlers"]["POST"]>) =>
    getInstance().handlers.POST(...args)) as AuthReturn["handlers"]["POST"],
};

export const auth = ((...args: Parameters<AuthReturn["auth"]>) =>
  getInstance().auth(...args)) as AuthReturn["auth"];

export const signIn = ((...args: Parameters<AuthReturn["signIn"]>) =>
  getInstance().signIn(...args)) as AuthReturn["signIn"];

export const signOut = ((...args: Parameters<AuthReturn["signOut"]>) =>
  getInstance().signOut(...args)) as AuthReturn["signOut"];
