import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  appName: "GPA Admin",
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  trustedOrigins: [
    "https://www.godspromisealuminiumroofing.com",
    "https://godspromisealuminiumroofing.com",
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  plugins: [
    admin(),
    nextCookies(), // required for Server Component session reads
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh after 1 day
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});

export type Session = typeof auth.$Infer.Session;
