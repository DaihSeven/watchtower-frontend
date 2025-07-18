"use client";
import { JWTPayload } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string, userData?: User) => void; // ✅ agora pode receber o usuário direto
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode<JWTPayload>(storedToken);
        const decodedUser: User = {
          id: Number(decoded.id),
          nome: decoded.nome,
          email: decoded.email,
          tipo_usuario: decoded.tipo_usuario,
        };
        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData?: User) => {
    let decodedUser: User;

    if (userData) {
      decodedUser = userData; // ✅ usa direto do backend
    } else {
      const decoded = jwtDecode<JWTPayload>(token);
      decodedUser = {
        id: Number(decoded.id),
        nome: decoded.nome,
        email: decoded.email,
        tipo_usuario: decoded.tipo_usuario,
      };
    }

    localStorage.setItem("token", token);
    setUser(decodedUser);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return context;
};