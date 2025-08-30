import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import type { D1Database } from "@cloudflare/workers-types";

export function createAuth(d1Database: D1Database) {
  return betterAuth({
    database: drizzleAdapter(db(d1Database), {
      provider: "sqlite"
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      openAPI(),
    ],
  });
}