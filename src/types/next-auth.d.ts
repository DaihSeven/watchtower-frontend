// types/next-auth.d.ts


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
