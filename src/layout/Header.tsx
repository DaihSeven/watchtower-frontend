'use client';

import { useState } from "react";
import Link from "next/link";
import { User, Menu } from "lucide-react";

export default function Services() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl font-bold text-blue-700 cursor-pointer">
            <span className="text-gray-800">Watch</span>
            <span className="text-blue-600">Tower</span>
          </div>
        </Link>

        {/* Menu de navegação (desktop) */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          {[
            { label: "Home", href: "/" },
            { label: "Pessoas", href: "/pessoaas" },
            { label: "Localizações", href: "/localizacoes" },
            { label: "Contato", href: "/contato" },
          ].map(({ label, href }) => (
            <li key={label} className="relative group pb-1">
              <Link
                href={href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Botões (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transform transition duration-200 hover:scale-110">
              Login
            </button>
          </Link>

          <Link href="/cadastro">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transform transition duration-200 hover:scale-110">
              Cadastro
            </button>
          </Link>

          <button
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full hover:bg-blue-200 transform transition duration-200 hover:scale-110"
              title="Perfil"
              aria-label="Perfil"
            >
              <User className="w-5 h-5" />
              <span className="sr-only">Perfil</span>
            </button>
        </div>

        {/* Ícone do menu (mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-blue-600 hover:bg-blue-100"
          title="Menu"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Menu responsivo (mobile) */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-6 flex flex-col items-center text-center">
          {/* Navegação */}
          <ul className="flex flex-col gap-2 w-full max-w-xs">
            {[
              { label: "Home", href: "/" },
              { label: "Pessoas", href: "/pessoas" },
              { label: "Avistamentos", href: "/avistamentos" },
              { label: "Localizações", href: "/localizacoes" },
              { label: "Contato", href: "/contato" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="block w-full px-4 py-2 rounded-full text-gray-700 text-sm font-medium text-center hover:bg-blue-600 hover:text-white transition duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botões */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Link href="/login">
              <button className="w-full border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition duration-200 hover:scale-105">
                Login
              </button>
            </Link>

            <Link href="/cadastro">
              <button className="w-full bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200 hover:scale-105">
                Cadastro
              </button>
            </Link>

            <button
              className="w-full bg-blue-100 text-blue-700 px-5 py-2 rounded-full hover:bg-blue-200 transition duration-200 hover:scale-105"
              title="Perfil"
              aria-label="Perfil"
            >
              <User className="w-5 h-5 mx-auto" />
              <span className="sr-only">Perfil</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
