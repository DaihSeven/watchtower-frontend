"use client";
import { JWTPayload } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user";

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
    if (typeof window === 'undefined') return;
    
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token");
        
        if (storedToken) {
          const decoded = jwtDecode<JWTPayload>(storedToken);
          
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            console.log("Token expirado, removendo...");
            localStorage.removeItem("token");
            setLoading(false);
            return;
          }
          
          const decodedUser: User = {
            id: Number(decoded.id),
            nome: decoded.nome,
            email: decoded.email,
            tipo_usuario: decoded.tipo_usuario,
          };
          
          setToken(storedToken);
          setUser(decodedUser);
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, userData?: User) => {
    try {
      let decodedUser: User;

      if (userData) {
        decodedUser = userData;
      } else {
        const decoded = jwtDecode<JWTPayload>(newToken);
        decodedUser = {
          id: Number(decoded.id),
          nome: decoded.nome,
          email: decoded.email,
          tipo_usuario: decoded.tipo_usuario,
        };
      }

      localStorage.setItem("token", newToken);
      setUser(decodedUser);
      setToken(newToken);
      
      console.log("Login realizado com sucesso:", decodedUser);
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("Erro ao processar token de login");
    }
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