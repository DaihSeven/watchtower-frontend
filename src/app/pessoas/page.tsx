"use client";

import { useEffect, useState } from "react";
import { getAllPessoas } from "@/services/pessoas";
import { Pessoa } from "@/types/pessoa";
import PessoaCard from "@/components/PessoaCard";
import PessoaForm from "@/components/PessoaForm";

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<Pessoa | undefined>(undefined);

  const fetchPessoas = async () => {
    try {
      setLoading(true);
      const data = await getAllPessoas();
      setPessoas(data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Pessoas Desaparecidas</h1>

      <PessoaForm
        editData={editData}
        onSuccess={() => {
          fetchPessoas();
          setEditData(undefined);
        }}
        onCancelEdit={() => setEditData(undefined)}
      />

      {loading ? (
        <p>Carregando pessoas...</p>
      ) : pessoas.length === 0 ? (
        <p>Nenhuma pessoa encontrada.</p>
      ) : (
        <div className="grid gap-4">
          {pessoas.map((p) => (
            <PessoaCard
              key={p.id}
              pessoa={p}
              onDeleted={fetchPessoas}
              onEdit={(item) => setEditData(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

