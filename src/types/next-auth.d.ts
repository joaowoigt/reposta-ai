import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: "free" | "creator" | "pro";
    } & DefaultSession["user"];
  }
}
