'use client';

import { PessoaDesaparecida } from "@/types/pessoas";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useState } from "react";
import Image from "next/image"; 
import { useAuth } from "@/context/AuthContext"; 

interface Props {
  pessoa: PessoaDesaparecida;
  onDelete?: () => void;
}

export function PessoaCard({ pessoa, onDelete }: Props) {
  const router = useRouter();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(false);

  const pertenceAoUsuario = user?.id === pessoa.userId || user?.tipo_usuario === "admin";

  async function excluir() {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    setLoading(true);
    try {
      await api.delete(`/pessoas/${pessoa.id}`);
      onDelete?.();
    } catch (e: unknown) {
      alert("Erro ao excluir");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 shadow bg-white rounded-xl space-y-2 border border-purple-400">
      <h2 className="text-xl font-bold">{pessoa.nome} ({pessoa.idade} anos)</h2>
      <p><strong>Status:</strong> {pessoa.status}</p>
      <p><strong>Desaparecido em:</strong> {new Date(pessoa.dataDesaparecimento).toLocaleDateString()}</p>
      <p><strong>Descrição:</strong> {pessoa.descricao || "Sem detalhes."}</p>

      {pessoa.imagemUrl && (
        <Image
          src={pessoa.imagemUrl}
          alt={`Imagem de ${pessoa.nome}`}
          width={300}
          height={200}
          className="rounded-lg object-cover"
        />
      )}

      {pertenceAoUsuario && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => router.push(`/pessoas/editar/${pessoa.id}`)}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Editar
          </button>
          <button
            onClick={excluir}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      )}
    </div>
  );
}
