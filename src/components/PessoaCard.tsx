'use client';

import { Pessoa } from "@/types/pessoas";
import { deletePessoa } from "@/services/pessoas";
import { useState } from "react";

interface Props {
  pessoa: Pessoa;
  onDeleted?: () => void;
  onEdit?: (pessoa: Pessoa) => void;
}

export default function PessoaCard({ pessoa, onDeleted, onEdit }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta pessoa?")) return;
    try {
      setLoading(true);
      await deletePessoa(pessoa.id);
      onDeleted?.();
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
      setErrorMsg("Erro ao excluir. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4 space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{pessoa.nome}</h3>
        <span className="text-sm text-gray-500">#{pessoa.id}</span>
      </div>

      <p><strong>Idade:</strong> {pessoa.idade} anos</p>
      <p><strong>Descrição:</strong> {pessoa.descricao}</p>

      {pessoa.ultimaLocalizacao && (
        <p><strong>Última localização:</strong> {pessoa.ultimaLocalizacao}</p>
      )}

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={() => onEdit?.(pessoa)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          ✏️ Editar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          {loading ? "Excluindo..." : "🗑️ Excluir"}
        </button>
      </div>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
}
