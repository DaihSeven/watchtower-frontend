export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-3 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between">
        <p className="text-sm text-center md:text-left">
          © 2025 Watchtower. Todos os direitos reservados.
        </p>
        <a
          href="https://github.com/seu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white hover:underline mt-2 md:mt-0"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
