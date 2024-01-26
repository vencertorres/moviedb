import { user as userTable } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";

export const insertUserSchema = createInsertSchema(userTable, {
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(8, "Must be at least 8 characters"),
});

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = insertUserSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, parsedCredentials.data.email));

          if (
            user[0] &&
            (await bcrypt.compare(
              parsedCredentials.data.password,
              user[0].password,
            ))
          ) {
            return JSON.parse(JSON.stringify(user[0]));
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session(params) {
      // @ts-ignore
      params.session.user.id = params.token.id;
      return params.session;
    },
  },
});
