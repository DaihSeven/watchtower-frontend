"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.replace("/login");
      } else if (user && user.tipo_usuario?.toLowerCase() !== "admin") {
        router.replace("/home");
      }
    }
  }, [token, user, loading, router]);

  if (loading || (token && !user)) {
    return <p>Carregando...</p>; 
  }

  return <>{children}</>;
}
