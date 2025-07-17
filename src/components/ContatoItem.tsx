'use client';
import Link from 'next/link';
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { Contato } from '@/types/contato';
import { useAuth } from '@/context/AuthContext';

export default function ContatoItem({ contato }: { contato: Contato }) {
  const { user } = useAuth();
  console.log("Tipos:", typeof contato.userId, typeof user?.id);

  const pertenceAoUsuario = contato.userId === String(user?.id);


  return (
    <li className="rounded-lg border-2 border-blue-500 shadow-[0_0_20px_5px_rgba(168,85,247,0.6)]  bg-white p-4 hover:bg-blue-50 transition-colors w-fit max-w-[48%]">
      <p className="font-semibold text-purple-800">{contato.nome}</p>
      <p className="text-blue-700 text-sm">
        {contato.email} — {contato.telefone || 'Sem telefone'}
      </p>
      <p className="text-purple-600 text-sm mt-1 font-semibold">{contato.mensagem}</p>

      <Link
        href={`/contato/${contato.id}`}
        className="flex items-center gap-2  mt-2 text-purple-600 hover:text-purple-800 underline text-sm font-medium"
      ><HiOutlineDocumentSearch />
        Ver / Editar
      </Link>

      {pertenceAoUsuario && (
        <div className="flex gap-2 mt-2 bg-white">
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
