"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPessoa, updatePessoa } from "@/services/pessoas";
import { Pessoa } from "@/types/pessoas";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
        if (typeof editData.id === "number") {
          await updatePessoa(editData.id, {
            ...data,
            desaparecidoDesde: editData.desaparecidoDesde,
          });
        } else {
          throw new Error("ID da pessoa para edição não está definido.");
        }
        setSuccessMsg("Pessoa atualizada com sucesso!");
      } else {
        await createPessoa({
          ...data,
          desaparecidoDesde: new Date().toISOString(), // ou defina conforme necessário
        });
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
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="space-y-3 bg-white py-3 px-4 rounded-2xl shadow-sm border border-purple-400 max-w-md mx-auto"

    >
      <motion.h2
        whileHover={{ x: 2 }}
        className="text-3xl font-bold text-gray-900 mb-6 text-center"
      >
        {editData ? "Editar Cadastro" : "Novo Cadastro"}
      </motion.h2>

      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="nome" className="block text-base font-medium text-gray-800 mb-2">
            Nome Completo
          </label>
          <motion.input
            id="nome"
            {...register("nome")}
            whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
            className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />
          <AnimatePresence>
            {errors.nome && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-600 text-sm mt-1 font-medium"
              >
                {errors.nome.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label htmlFor="idade" className="block text-base font-medium text-gray-800 mb-2">
            Idade
          </label>
          <motion.input
            id="idade"
            type="number"
            {...register("idade")}
            whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
            className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />
          <AnimatePresence>
            {errors.idade && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-600 text-sm mt-1 font-medium"
              >
                {errors.idade.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="descricao" className="block text-base font-medium text-gray-800 mb-2">
            Descrição
          </label>
          <motion.textarea
            id="descricao"
            {...register("descricao")}
            whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
            rows={4}
            className="w-full px-4 py-3 text-gray-900 border border-purple-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />

          <AnimatePresence>
            {errors.descricao && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-600 text-sm mt-1 font-medium"
              >
                {errors.descricao.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label htmlFor="ultimaLocalizacao" className="block text-base font-medium text-gray-800 mb-2">
            Última Localização
          </label>
          <motion.input
          id="ultimaLocalizacao"
          {...register("ultimaLocalizacao")}
          whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
          className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />

        </motion.div>
      </div>

      <motion.div 
        className="flex gap-4 pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex-1 font-medium text-lg shadow-sm"
        >
          {loading ? (
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {editData ? "Salvando..." : "Cadastrando..."}
            </motion.span>
          ) : editData ? (
            "Salvar Alterações"
          ) : (
            "Cadastrar"
          )}
        </motion.button>

        {editData && (
          <motion.button
            type="button"
            onClick={onCancelEdit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 flex-1 font-medium text-lg shadow-sm"
          >
            Cancelar
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-green-600 text-center mt-4 font-medium text-lg"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}