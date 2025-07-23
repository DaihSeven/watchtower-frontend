'use client';
import { useEffect, useState } from "react";
import { PessoaDesaparecida } from "@/types/pessoas";
import { api } from "@/services/api";
import { PessoaCard } from "@/components/PessoaCard";

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<PessoaDesaparecida[]>([]);

  async function carregar() {
  const res = await api.get("/pessoas");
  
  if (res.data && Array.isArray(res.data.pessoas)) {
    setPessoas(res.data.pessoas);
  } else if (Array.isArray(res.data)) {
    setPessoas(res.data);
  } else {
    setPessoas([]);
  }
}

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pessoas Desaparecidas</h1>
      <div className="grid gap-4">
        {pessoas.map((p) => (
          <PessoaCard key={p.id} pessoa={p} onDelete={carregar} />
        ))}
      </div>
    </div>
  );
}
