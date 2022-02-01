import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createSession } from "../../../services/api";

export default NextAuth({
  secret: "fVVsnHx/uMy5WsagSDfAeZtroZhPfPWVyeMcqMLc4eI=",
  callbacks: {
    async session({ session, user, token }) {
      console.log("session (user) = ", user);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt (user) = ", user);
      return token;
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

          const res = (await createSession(email, password)).data;

          const user = { token: res.token };

          console.log("res = ", res.token);

          // if (res) return Promise.resolve(res.data);
          if (res) return user;
        }
        console.log("Missing params");
        return Promise.reject(new Error("Missing params"));
      },
    }),
  ],
});
