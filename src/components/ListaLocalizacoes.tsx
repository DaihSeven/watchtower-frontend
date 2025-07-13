"use client";

import { LocalizacaoComAvistamento } from '@/types/localizacao';

interface Props {
  localizacoes: LocalizacaoComAvistamento[];
  onLocalizacaoClick: (localizacao: LocalizacaoComAvistamento) => void;
  onRefresh: () => void;
  loading: boolean;
  error: string | null;
}

export default function ListaLocalizacoes({ 
  localizacoes, 
  onLocalizacaoClick, 
  onRefresh, 
  loading, 
  error 
}: Props) {
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-700">Localizações</h2>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-3 py-1 rounded-md text-sm flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-indigo-600">Carregando localizações...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {localizacoes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhuma localização encontrada.</p>
          ) : (
            localizacoes.map((localizacao) => {
              const status = getStatusInfo(localizacao);
              return (
                <div 
                  key={localizacao.id}
                  className="location-card bg-gray-50 p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-indigo-700">{localizacao.nome || 'Local sem nome'}</h3>
                    <span className={`bg-${status.color}-100 text-${status.color}-800 text-xs px-2 py-1 rounded-full`}>
                      {status.text}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {localizacao.descricao || 'Sem descrição'}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Lat: {localizacao.latitude}, Long: {localizacao.longitude}</p>
                    {localizacao.avistamento && (
                      <p>Data: {new Date(localizacao.avistamento.dataAvistamento).toLocaleDateString()}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => onLocalizacaoClick(localizacao)}
                    className="view-details mt-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Ver detalhes
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
} 