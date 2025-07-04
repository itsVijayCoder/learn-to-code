import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { env } from "@/config/env";
import type { AuthOptions } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
   interface Session {
      user: {
         id: string;
         email: string;
         name: string;
         role: "student" | "instructor" | "admin";
         image?: string;
      };
   }

   interface User {
      id: string;
      email: string;
      name: string;
      role: "student" | "instructor" | "admin";
      image?: string;
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      id: string;
      role: "student" | "instructor" | "admin";
   }
}

const authOptions: AuthOptions = {
   providers: [
      // Credentials provider for email/password login
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: {
               label: "Email",
               type: "email",
               placeholder: "john@example.com",
            },
            password: {
               label: "Password",
               type: "password",
            },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               return null;
            }

            try {
               // TODO: Replace with actual database query
               // For now, this is a mock implementation
               const mockUser = {
                  id: "1",
                  email: credentials.email,
                  name: "Test User",
                  role: "student" as const,
                  hashedPassword: "$2a$12$dummy.hash", // In real app, fetch from database
               };

               // Verify password
               const isValid = await compare(
                  credentials.password,
                  mockUser.hashedPassword
               );

               if (!isValid) {
                  return null;
               }

               return {
                  id: mockUser.id,
                  email: mockUser.email,
                  name: mockUser.name,
                  role: mockUser.role,
               };
            } catch {
               console.error("Auth error");
               return null;
            }
         },
      }),

      // OAuth providers
      ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
         ? [
              GitHubProvider({
                 clientId: env.GITHUB_CLIENT_ID,
                 clientSecret: env.GITHUB_CLIENT_SECRET,
              }),
           ]
         : []),

      ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
         ? [
              GoogleProvider({
                 clientId: env.GOOGLE_CLIENT_ID,
                 clientSecret: env.GOOGLE_CLIENT_SECRET,
              }),
           ]
         : []),
   ],

   callbacks: {
      async jwt({ token, user, account }) {
         // Initial sign in
         if (user) {
            token.id = user.id;
            token.role = user.role;
         }

         // OAuth sign in
         if (account?.provider === "github" || account?.provider === "google") {
            // TODO: Check if user exists in database, create if not
            // For now, assign default role
            token.role = token.role || "student";
         }

         return token;
      },

      async session({ session, token }) {
         if (token) {
            session.user.id = token.id;
            session.user.role = token.role;
         }

         return session;
      },

      async signIn() {
         // Allow all sign ins for now
         // TODO: Add custom logic like email verification, banned users, etc.
         return true;
      },

      async redirect({ url, baseUrl }) {
         // Allows relative callback URLs
         if (url.startsWith("/")) return `${baseUrl}${url}`;
         // Allows callback URLs on the same origin
         else if (new URL(url).origin === baseUrl) return url;
         return baseUrl;
      },
   },

   pages: {
      signIn: "/auth/login",
      error: "/auth/error",
      verifyRequest: "/auth/verify-request",
      newUser: "/auth/new-user",
   },

   session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
   },

   jwt: {
      secret: env.NEXTAUTH_SECRET,
   },

   debug: env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
