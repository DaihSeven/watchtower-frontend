'use client';

export default function Footer() {
  return (
    <footer className="bg-[var(--main-color)] text-white">
      <div className="border-t border-gray-700 pt-6 px-6 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-2 justify-center md:justify-start w-full md:w-auto">
          <span className="text-sm select-none">© 2025 Watchtower. Todos os direitos reservados.</span>
        </div>
        <a
          href="https://github.com/DaihSeven/watchtower-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
