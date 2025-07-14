"use client";

import { PessoaDesaparecida } from '@/types/localizacao';

interface Props {
  pessoa: PessoaDesaparecida | null;
  onClose: () => void;
  onReportarAvistamento: () => void;
  onCompartilhar: () => void;
}

export default function DetalhesPessoa({ 
  pessoa, 
  onClose, 
  onReportarAvistamento, 
  onCompartilhar 
}: Props) {
  if (!pessoa) return null;

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Detalhes da Pessoa Desaparecida</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
            {pessoa.foto ? (
              <img 
                src={pessoa.foto} 
                alt={pessoa.nome}
                className="h-32 w-32 object-cover rounded-lg"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800">{pessoa.nome}</h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <p className="text-sm text-gray-500">Idade</p>
              <p className="font-medium">{pessoa.idade} anos</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Desaparecido desde</p>
              <p className="font-medium">
                {new Date(pessoa.desaparecidoDesde).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Último avistamento</p>
              <p className="font-medium">
                {pessoa.ultimoAvistamento 
                  ? new Date(pessoa.ultimoAvistamento).toLocaleDateString() 
                  : 'Desconhecido'
                }
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contato</p>
              <p className="font-medium">{pessoa.contato}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-500">Descrição</p>
            <p className="mt-1">{pessoa.descricao}</p>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <button 
              onClick={onReportarAvistamento}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              Reportar avistamento
            </button>
            <button 
              onClick={onCompartilhar}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm transition-colors"
            >
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 