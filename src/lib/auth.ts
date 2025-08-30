import { db } from "@/db/db";
import { sendEmail } from "@/lib/email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { env } from "cloudflare:workers";

export function createAuth() {
  return betterAuth({
    database: drizzleAdapter(db(), {
      provider: "sqlite"
    }),
    baseUrl: env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url, token }, request) => {
        await sendEmail({
          to: user.email,
          subject: "Verify your email address",
          text: `Click the link to verify your email address: ${url}`,
        });
      },
    },
    plugins: [
      openAPI(),
    ],
  });
}