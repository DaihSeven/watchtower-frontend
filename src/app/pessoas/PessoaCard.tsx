"use client";
import { useSession } from "next-auth/react";
import { Pessoa } from "@/types/pessoas";

interface PessoaCardProps {
  pessoa: Pessoa;
}

export default function PessoaCard({ pessoa }: PessoaCardProps) {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === pessoa.userId;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="p-4 bg-white dark:bg-zinc-800 shadow rounded-xl">
      <h2 className="font-bold text-xl">{pessoa.nome}</h2>
      {pessoa.idade && <p className="text-sm">Idade: {pessoa.idade} anos</p>}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Desaparecido desde: {pessoa.desaparecidoDesde}
      </p>
      {pessoa.ultimaLocalizacao && (
        <p className="text-sm">Última localização: {pessoa.ultimaLocalizacao}</p>
      )}
      {pessoa.descricao && <p className="mt-2">{pessoa.descricao}</p>}
      {pessoa.fotoUrl && (
        <img
          src={pessoa.fotoUrl}
          alt={`Foto de ${pessoa.nome}`}
          className="mt-4 rounded-md max-h-64 object-cover"
        />
      )}

      {(isOwner || isAdmin) && (
        <div className="flex gap-2 mt-4">
          <button className="text-blue-500 hover:underline">Editar</button>
          <button className="text-red-500 hover:underline">Excluir</button>
        </div>
      )}
    </div>
  );
}
