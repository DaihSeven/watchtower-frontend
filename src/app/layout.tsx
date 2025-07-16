import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "Watchtower",
  description: "Site oficial Watchtower - plataforma de monitoramento",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">

      <body className={`${poppins.className }antialiased`}>
        <Header />
        <AuthProvider>
        {children}
        </AuthProvider>
        <Footer />
      </body>
              
    </html>
  );
}
