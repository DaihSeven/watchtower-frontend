"use client";
import { JWTPayload, User } from "@/types/user";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string, userData?: User) => void; 
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
      decodedUser = userData;
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

  const contextValue = useMemo(() => ({
    user,
    token,
    login,
    logout,
    loading
  }), [user, token, login, logout, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
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