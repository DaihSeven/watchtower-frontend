// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: "admin" | "user";
      name?: string;
      email?: string;
    };
  }
}
