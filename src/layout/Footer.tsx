'use client';

export default function Footer() {
  return (
    <footer className="bg-[var(--main-color)] text-white">
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center px-6 pb-6">
        <div className="flex items-center gap-2">
          <img
            src="/img1.png"
            alt="logo"
            width={50}
            height={50}
          />
          <span className="text-sm">© 2025 Watchtower. Todos os direitos reservados.</span>
        </div>
        <a
          href="https://github.com/seu-usuario/seu-repositorio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm mt-4 md:mt-0 hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
