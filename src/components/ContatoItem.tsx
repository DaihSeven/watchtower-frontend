'use client';
import Link from 'next/link';
import { Contato } from '@/types/contato';
import { useAuth } from '@/context/AuthContext';

export default function ContatoItem({ contato }: { contato: Contato }) {
  const { user } = useAuth();
  console.log("Tipos:", typeof contato.userId, typeof user?.id);

  const pertenceAoUsuario = contato.userId === String(user?.id);


  return (
    <li className="border border-purple-200 bg-white p-4 rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
      <p className="font-semibold text-purple-800">{contato.nome}</p>
      <p className="text-purple-700 text-sm">
        {contato.email} — {contato.telefone || 'Sem telefone'}
      </p>

      <Link
        href={`/contatos/${contato.id}`}
        className="inline-block mt-2 text-purple-600 hover:text-purple-800 underline text-sm font-medium"
      >
        Ver / Editar
      </Link>

      {pertenceAoUsuario && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => alert(`Editar ${contato.id}`)}
            className="text-sm text-blue-600 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => alert(`Excluir ${contato.id}`)}
            className="text-sm text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      )}
    </li>
  );
}
