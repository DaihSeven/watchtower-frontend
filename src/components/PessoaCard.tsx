'use client';

import { Pessoa } from "@/types/pessoas";
import { deletePessoa } from "@/services/pessoas";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <motion.h3 
            whileHover={{ x: 2 }}
            className="text-xl font-bold text-gray-900"
          >
            {pessoa.nome}
          </motion.h3>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            ID: #{pessoa.id}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-gray-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="text-gray-800">
              <span className="font-medium">Idade:</span> {pessoa.idade} anos
            </p>
          </div>

          <div className="flex items-start">
            <span className="text-gray-500 mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="text-gray-800">
              <span className="font-medium">Descrição:</span> {pessoa.descricao}
            </p>
          </div>

          {pessoa.ultimaLocalizacao && (
            <div className="flex items-center">
              <span className="text-gray-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="text-gray-800">
                <span className="font-medium">Última localização:</span> {pessoa.ultimaLocalizacao}
              </p>
            </div>
          )}
        </div>
      </div>

      <motion.div 
        className="bg-gray-50 px-6 py-4 flex justify-end gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.button
          type="button"
          onClick={() => onEdit?.(pessoa)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-amber-500 text-white px-5 py-2 rounded-xl hover:bg-amber-600 font-medium flex items-center gap-2 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Editar
        </motion.button>
        
        <motion.button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 font-medium flex items-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Excluindo...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Excluir
            </>
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {errorMsg && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-600 text-sm font-medium px-6 pb-4 text-center"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}