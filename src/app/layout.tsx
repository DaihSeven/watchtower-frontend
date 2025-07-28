import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Watchtower",
  description: "Site oficial Watchtower - plataforma de monitoramento",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para otimizar carregamento das fontes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Google Fonts via CDN, correção necessário após problema com turbopack */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body className="font-poppins antialiased">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>      
    </html>
  );
}