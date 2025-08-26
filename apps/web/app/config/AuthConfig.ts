import { prisma } from "@repo/db"; // ensure this name matches your db export
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

console.log("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);

// Use JWT sessions and handle user persistence manually in the signIn callback.
// This avoids the Prisma adapter and keeps things simple for development.
export const AuthConfigs: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // server env, not NEXT_PUBLIC
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // Upsert (create or update) the user in our database when they sign in.
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const emailAddr = user?.email ?? (email as any)?.value ?? (profile as any)?.email;
        if (!emailAddr) return false;

        const upserted = await prisma.user.upsert({
          where: { email: emailAddr },
          update: {
            name: (profile as any)?.name ?? user?.name ?? undefined,
            updatedAt: new Date(),
          },
          create: {
            email: emailAddr,
            name: (profile as any)?.name ?? user?.name ?? undefined,
          },
        });

        // Attach the DB id to the user object so jwt callback can pick it up.
        (user as any).id = upserted.id;
        return true;
      } catch (err) {
        console.error("signIn upsert error:", err);
        return false;
      }
    },

    // Token callback: include user id in the JWT
    async jwt({ token, user }) {
      if (user && (user as any).id) token.id = (user as any).id;
      return token;
    },

    // Session callback: expose id on session.user
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};


