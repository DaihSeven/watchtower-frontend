"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPessoa, updatePessoa } from "@/services/pessoas";
import { Pessoa } from "@/types/pessoas";
import { useEffect, useState } from "react";
import axios from "axios";

const schema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  idade: z.coerce.number().min(1, "Idade obrigatória"),
  descricao: z.string().min(5, "Descrição muito curta"),
  ultimaLocalizacao: z.string().optional(),
});

type PessoaFormData = z.infer<typeof schema>;

interface Props {
  editData?: Pessoa;
  onSuccess: () => void;
  onCancelEdit?: () => void;
}

export default function PessoaForm({ editData, onSuccess, onCancelEdit }: Props) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PessoaFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      idade: 0,
      descricao: "",
      ultimaLocalizacao: "",
    },
  });

  useEffect(() => {
    if (editData) reset(editData);
  }, [editData, reset]);

  const onSubmit: SubmitHandler<PessoaFormData> = async (data) => {
    try {
      setLoading(true);
      if (editData) {
        await updatePessoa(editData.id, data);
        setSuccessMsg("Pessoa atualizada com sucesso!");
      } else {
        await createPessoa(data);
        setSuccessMsg("Pessoa cadastrada com sucesso!");
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">
        {editData ? "Editar Pessoa" : "Cadastrar Pessoa"}
      </h2>

      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input {...register("nome")} className="input" />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Idade</label>
        <input type="number" {...register("idade")} className="input" />
        {errors.idade && <p className="text-red-500 text-sm">{errors.idade.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Descrição</label>
        <textarea {...register("descricao")} className="input" />
        {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Última Localização</label>
        <input {...register("ultimaLocalizacao")} className="input" />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading
            ? editData
              ? "Salvando..."
              : "Cadastrando..."
            : editData
            ? "Salvar Alterações"
            : "Cadastrar"}
        </button>

        {editData && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-gray-600 underline"
          >
            Cancelar Edição
          </button>
        )}
      </div>

      {successMsg && <p className="text-green-600">{successMsg}</p>}
    </form>
  );
}
