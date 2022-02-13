import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { createSession } from "../../../services/api";

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      return Promise.resolve({ ...session, user, ...token });
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return Promise.resolve(user || token);
    },
  },
  pages: {
    signIn: "/session/login",
    signOut: "/",
    error: "/error", // Error code passed in query string as ?error=
    verifyRequest: "/session/confirmation", // (used for check email message)
    newUser: "/session/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: "Login",
      id: "login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials?.email === "" || credentials?.password) {
          const email = credentials.email;
          const password = credentials.password;
          const token = (await createSession(email, password)).data.token;

          if (token) return { token };
          return null;
        }
        return Promise.reject(new Error("Missing params"));
      },
    }),
  ],
});
