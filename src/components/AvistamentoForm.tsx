"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAvistamento, updateAvistamento } from "@/services/avistamentos";
import { useEffect, useState } from "react";
import { Avistamento } from "@/types/avistamento";
import axios from "axios";

const schema = z.object({
  idPessoaDesaparecida: z.coerce.number().min(1, "Selecione uma pessoa"),
  comentario: z.string().min(5, "Comentário muito curto"),
  localAvistamento: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  nomeInformante: z.string().optional(),
  contatoInformante: z.string().optional(),
});

type AvistamentoFormData = z.infer<typeof schema>;

interface Props {
  editData?: Avistamento;
  onSuccess: () => void;
  onCancelEdit?: () => void;
}

export default function AvistamentoForm({
  editData,
  onSuccess,
  onCancelEdit,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvistamentoFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit: SubmitHandler<AvistamentoFormData> = async (data) => {
    try {
      setLoading(true);
      if (editData) {
        await updateAvistamento(editData.id, data);
        setSuccessMsg("Avistamento atualizado com sucesso!");
      } else {
        await createAvistamento(data);
        setSuccessMsg("Avistamento criado com sucesso!");
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar avistamento:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md border-2 border-purple-500 shadow-[0_0_20px_5px_rgba(168,85,247,0.6)] transition duration-500 text-purple-700"
    >
      <h2 className="text-xl text-[#000] font-semibold">
        {editData ? "Editar Avistamento" : "Registrar Avistamento"}
      </h2>

      <div>
        <label
          htmlFor="idPessoaDesaparecida"
          className="block text-sm text-[#000] font-medium"
        >
          ID da Pessoa Desaparecida
        </label>
        <input
          id="idPessoaDesaparecida"
          type="number"
          {...register("idPessoaDesaparecida")}
          className="input"
        />
        {errors.idPessoaDesaparecida && (
          <p className="text-red-500 text-sm">
            {errors.idPessoaDesaparecida.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="comentario"
          className="block text-sm text-[#000] font-medium"
        >
          Comentário
        </label>
        <textarea
          id="comentario"
          {...register("comentario")}
          className="input"
        />
        {errors.comentario && (
          <p className="text-red-500 text-sm">{errors.comentario.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="localAvistamento"
            className="block text-[#000] text-sm font-medium"
          >
            Local
          </label>
          <input
            id="localAvistamento"
            {...register("localAvistamento")}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium">
            Latitude
          </label>
          <input
            id="latitude"
            type="number"
            {...register("latitude")}
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="longitude"
            className="block text-sm text-[#000] font-medium"
          >
            Longitude
          </label>
          <input
            id="longitude"
            type="number"
            {...register("longitude")}
            className="input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="nomeInformante"
            className="block text-sm text-[#000] font-medium"
          >
            Nome do Informante
          </label>
          <input
            id="nomeInformante"
            {...register("nomeInformante")}
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="contatoInformante"
            className="block text-sm text-[#000] font-medium"
          >
            Contato do Informante
          </label>
          <input
            id="contatoInformante"
            {...register("contatoInformante")}
            className="input"
          />
        </div>
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
              : "Registrando..."
            : editData
            ? "Salvar Alterações"
            : "Registrar"}
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
