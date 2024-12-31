import NextAuth, { NextAuthOptions } from "next-auth";
import User from "@/models/user-model";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Email and password are required.");
          }

          // Connect to the database
          await connectToDatabase();

          // Find the user in the database
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found.");
          }

          if (!user.password) {
            throw new Error("User password is missing.");
          }

          // Compare the provided password with the hashed password in the database
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }

          // Return user object
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      let existingUser;
      if (account?.provider === "github" || account?.provider === "google") {
        await connectToDatabase();

        existingUser = await User.findOne({
          email: profile?.email,
        });

        if (!existingUser) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            role: "user",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbuser = await User.findOne({ email: user.email });
        token.id = user.id;
        token.email = user.email;
        token.role = dbuser?.role ?? "";
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          role: token.role,
          id: token.id,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    encode: async ({ secret, token }) => {
      if (!token) {
        throw new Error("No token to encode.");
      }
      return jwt.sign(token, secret, { algorithm: "HS256" });
    },
    async decode({ token, secret }) {
      if (!token) {
        return null;
      }

      try {
        // Ensure the token is decoded and typecast to match your custom JWT interface
        const decodedToken = jwt.verify(token, secret) as JWT;
        return decodedToken;
      } catch (error) {
        console.log("Error decoding token:", error);
        return null;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
