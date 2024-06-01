import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "prisma/client";
import { CredentialsSchema } from "prisma/zod/schema";

export const authOptions: AuthOptions = {
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = await CredentialsSchema.parseAsync(credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: creds.email,
          },
        });
        if (user) {
          if (user.password === creds.password) {
            return user;
          }
        }
        // Failed authorisation
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.is_admin = user.is_admin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.is_admin = token.is_admin as boolean;
      return session;
    },
    redirect: async ({ baseUrl }) => {
      return Promise.resolve(`${baseUrl}/admin`);
    },
  },
};

export default NextAuth(authOptions);
