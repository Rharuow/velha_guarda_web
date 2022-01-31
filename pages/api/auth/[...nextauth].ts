import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createSession } from "../../../services/api";

export default NextAuth({
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

          const res = await createSession(email, password);

          if (res) return Promise.resolve(res.data);
        }
        console.log("Missing params");
        return Promise.reject(new Error("Missing params"));
      },
    }),
  ],
});
