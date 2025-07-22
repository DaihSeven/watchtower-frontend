"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cadastrarPessoa } from "@/services/pessoas";

const schema = z.object({
  nome: z.string().min(3),
  idade: z.number().min(1),
  dataDesaparecimento: z.string().min(1),
  descricao: z.string().optional(),
  status: z.enum(["ATIVO", "ENCONTRADO"]),
});

type FormData = z.infer<typeof schema>;

export function PessoaForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await cadastrarPessoa(data);
      alert("Pessoa cadastrada!");
      reset();
      onSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || "Erro ao cadastrar.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold mb-4">Cadastrar Pessoa</h2>
      <input {...register("nome")} placeholder="Nome" className="input mb-2" />
      {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

      <input {...register("idade", { valueAsNumber: true })} placeholder="Idade" type="number" className="input mb-2" />
      {errors.idade && <p className="text-red-500">{errors.idade.message}</p>}

      <input {...register("dataDesaparecimento")} type="date" className="input mb-2" />
      {errors.dataDesaparecimento && <p className="text-red-500">{errors.dataDesaparecimento.message}</p>}

      <textarea {...register("descricao")} placeholder="Descrição (opcional)" className="input mb-2" />

      <select {...register("status")} className="input mb-2">
        <option value="ATIVO">ATIVO</option>
        <option value="ENCONTRADO">ENCONTRADO</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</button>
    </form>
  );
}
