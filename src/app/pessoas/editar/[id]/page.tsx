'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { PessoaDesaparecida } from "@/types/pessoas";
import { PessoaForm } from "@/components/PessoaForm";

export default function EditarPessoaPage() {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState<PessoaDesaparecida | null>(null);

  useEffect(() => {
    api.get(`/pessoas/${id}`).then((res) => setPessoa(res.data));
  }, [id]);

  if (!pessoa) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Pessoa</h1>
      <PessoaForm pessoa={pessoa} />
    </div>
  );
}
