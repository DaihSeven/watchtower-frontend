"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pessoa, atualizarPessoa } from "@/services/pessoas";
import { useEffect } from "react";

const schema = z.object({
  nome: z.string().min(3),
  idade: z.number().min(1),
  dataDesaparecimento: z.string().min(1),
  descricao: z.string().optional(),
  status: z.enum(["ATIVO", "ENCONTRADO"]),
});

type FormData = z.infer<typeof schema>;

interface Props {
  pessoa: Pessoa;
  onClose: () => void;
  onUpdated: () => void;
}

export function PessoaEditModal({ pessoa, onClose, onUpdated }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset({
      nome: pessoa.nome,
      idade: pessoa.idade,
      dataDesaparecimento: pessoa.dataDesaparecimento.split("T")[0],
      descricao: pessoa.descricao,
      status: pessoa.status,
    });
  }, [pessoa, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await atualizarPessoa(pessoa.id, data);
      alert("Pessoa atualizada!");
      onUpdated();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Erro ao atualizar.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Editar Pessoa</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...register("nome")} className="input" placeholder="Nome" />
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

          <input type="number" {...register("idade", { valueAsNumber: true })} className="input" placeholder="Idade" />
          {errors.idade && <p className="text-red-500">{errors.idade.message}</p>}

          <input type="date" {...register("dataDesaparecimento")} className="input" />
          {errors.dataDesaparecimento && <p className="text-red-500">{errors.dataDesaparecimento.message}</p>}

          <textarea {...register("descricao")} className="input" placeholder="Descrição" />

          <select {...register("status")} className="input">
            <option value="ATIVO">ATIVO</option>
            <option value="ENCONTRADO">ENCONTRADO</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
