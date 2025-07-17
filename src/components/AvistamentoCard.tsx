"use client";

import { Avistamento } from "@/types/avistamento";
import { deleteAvistamento } from "@/services/avistamentos";
import { useState } from "react";

interface Props {
  avistamento: Avistamento;
  onDeleted?: () => void;
  onEdit: (avistamento: Avistamento) => void;
  user: {
    id: number;
    tipo_usuario: string;
  } | null;
}

export default function AvistamentoCard({ avistamento, onDeleted, onEdit, user }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este avistamento?")) return;
    try {
      setLoading(true);
      await deleteAvistamento(avistamento.id);
      onDeleted?.();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setErrorMsg("Erro ao excluir. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isOwner = user?.id === avistamento.userId || user?.tipo_usuario === "ADMIN";

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2 text-black border-2 border-blue-500 shadow-[0_0_20px_5px_rgba(168,85,247,0.6)] transition duration-500">

      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-[#000]">Avistamento #{avistamento.id}</h3>
        <span className="text-sm text-[#000]">
          {new Date(avistamento.dataCadastro || "").toLocaleString()}
        </span>
      </div>

      <p><strong>Comentário:</strong> {avistamento.comentario}</p>

      {avistamento.localAvistamento && (
        <p><strong>Local:</strong> {avistamento.localAvistamento}</p>
      )}

      {(avistamento.latitude !== undefined && avistamento.longitude !== undefined) && (
        <p><strong>Coordenadas:</strong> {avistamento.latitude}, {avistamento.longitude}</p>
      )}

      {avistamento.nomeInformante && (
        <p><strong>Informante:</strong> {avistamento.nomeInformante}</p>
      )}

      {avistamento.contatoInformante && (
        <p><strong>Contato:</strong> {avistamento.contatoInformante}</p>
      )}

      {isOwner && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onEdit(avistamento)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            {loading ? "Excluindo..." : "🗑️ Excluir"}
          </button>
        </div>
      )}

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
}
