"use client";

import { LocalizacaoComAvistamento } from "@/types/localizacao";

interface Props {
  localizacao: LocalizacaoComAvistamento;
  onClick: (localizacao: LocalizacaoComAvistamento) => void;
}

export default function LocalCard({ localizacao, onClick }: Props) {
  const getStatusInfo = (localizacao: LocalizacaoComAvistamento) => {
    if (localizacao.avistamento) {
      if (localizacao.avistamento.confirmado) {
        return { color: 'green', text: 'Confirmado' };
      } else {
        return { color: 'yellow', text: 'Não confirmado' };
      }
    }
    return { color: 'gray', text: 'Desconhecido' };
  };

  const status = getStatusInfo(localizacao);

  return (
    <div 
      className="bg-white border rounded-lg shadow p-4 space-y-2 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(localizacao)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-indigo-700">
          {localizacao.nome || 'Local sem nome'}
        </h3>
        <span className={`bg-${status.color}-100 text-${status.color}-800 text-xs px-2 py-1 rounded-full`}>
          {status.text}
        </span>
      </div>

      <p className="text-gray-600">
        {localizacao.descricao || 'Sem descrição'}
      </p>

      <div className="text-sm text-gray-500">
        <p><strong>Coordenadas:</strong> {localizacao.latitude}, {localizacao.longitude}</p>
        {localizacao.avistamento && (
          <p><strong>Data do avistamento:</strong> {new Date(localizacao.avistamento.dataAvistamento).toLocaleDateString()}</p>
        )}
      </div>

      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
        Ver detalhes →
      </button>
    </div>
  );
}