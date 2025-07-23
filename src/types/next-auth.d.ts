// types/next-auth.d.ts


declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: "admin" | "usuario";//oi user, verificar depois!!!
      name?: string;
      email?: string;
    };
  }
}
