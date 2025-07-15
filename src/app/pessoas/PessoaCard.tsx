// PessoaCard.tsx
"use client";
import { useSession } from "next-auth/react";

export default function PessoaCard({ pessoa }) {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === pessoa.userId;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="p-4 bg-white dark:bg-zinc-800 shadow rounded-xl">
      <h2 className="font-bold text-xl">{pessoa.nome}</h2>
      <p>{pessoa.descricao}</p>

      {(isOwner || isAdmin) && (
        <div className="flex gap-2 mt-2">
          <button className="text-blue-500">Editar</button>
          <button className="text-red-500">Excluir</button>
        </div>
      )}
    </div>
  );
}
