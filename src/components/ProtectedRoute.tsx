"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Só roda quando terminar de carregar e já tivermos o user (ou certeza de que não tem)
    if (!loading) {
      if (!token) {
        router.replace("/login");
      } else if (user && user.tipo_usuario?.toLowerCase() !== "admin") {
        router.replace("/home");
      }
    }
  }, [token, user, loading, router]);

  // Enquanto carrega ou enquanto ainda não definiu o user, não renderiza nada
  if (loading || (token && !user)) {
    return <p>Carregando...</p>; // ou um spinner bonitinho
  }

  return <>{children}</>;
}
