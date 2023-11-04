import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "prisma/client";
import { CredentialsSchema } from "prisma/zod/schema";

export const authOptions: AuthOptions = {
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
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(`${baseUrl}/admin`);
    },
  },
};

export default NextAuth(authOptions);
