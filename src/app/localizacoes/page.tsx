"use client";

import { useState, useEffect } from 'react';
import MapaLocalizacoes from '@/components/MapaLocalizacoes';
import ListaLocalizacoes from '@/components/ListaLocalizacoes';
import DetalhesPessoa from '@/components/DetalhesPessoa';
import { LocalizacaoComAvistamento, PessoaDesaparecida } from '@/types/localizacao';
import { getLocalizacoesComAvistamentos, getPessoaDesaparecida } from '@/services/localizacoes';

export default function LocalizacoesPage() {
  const [localizacoes, setLocalizacoes] = useState<LocalizacaoComAvistamento[]>([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<PessoaDesaparecida | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarLocalizacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Dados simulados para demonstração (remover em produção)
      const dadosSimulados: LocalizacaoComAvistamento[] = [
        { 
          id: 1, 
          nome: 'Parque Ibirapuera', 
          descricao: 'Avistamento próximo ao lago', 
          latitude: -23.587, 
          longitude: -46.657, 
          pessoaId: 101,
          avistamento: {
            id: 1,
            dataAvistamento: '2023-06-10T14:30:00',
            confirmado: true,
            descricao: 'Pessoa vista caminhando sozinha'
          }
        },
        { 
          id: 2, 
          nome: 'Shopping Center Norte', 
          descricao: 'Visto na praça de alimentação', 
          latitude: -23.510, 
          longitude: -46.612, 
          pessoaId: 102,
          avistamento: {
            id: 2,
            dataAvistamento: '2023-06-12T18:45:00',
            confirmado: false,
            descricao: 'Possível avistamento, não confirmado'
          }
        },
        { 
          id: 3, 
          nome: 'Estação Sé', 
          descricao: 'Avistado na plataforma central', 
          latitude: -23.550, 
          longitude: -46.633, 
          pessoaId: 103,
          avistamento: {
            id: 3,
            dataAvistamento: '2023-06-15T08:20:00',
            confirmado: true,
            descricao: 'Identificado por câmeras de segurança'
          }
        },
        { 
          id: 4, 
          nome: 'Avenida Paulista', 
          descricao: 'Próximo ao MASP', 
          latitude: -23.561, 
          longitude: -46.656, 
          pessoaId: 104
        },
        { 
          id: 5, 
          nome: 'Terminal Tietê', 
          descricao: 'Na área de embarque', 
          latitude: -23.516, 
          longitude: -46.622, 
          pessoaId: 105,
          avistamento: {
            id: 4,
            dataAvistamento: '2023-06-16T22:10:00',
            confirmado: false,
            descricao: 'Relato de terceiros, sem confirmação'
          }
        }
      ];

      // Em produção, usar: const dados = await getLocalizacoesComAvistamentos();
      setLocalizacoes(dadosSimulados);
    } catch (err) {
      console.error('Erro ao carregar localizações:', err);
      setError('Erro ao carregar os dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocalizacaoClick = async (localizacao: LocalizacaoComAvistamento) => {
    try {
      // Dados simulados da pessoa (remover em produção)
      const pessoaSimulada: PessoaDesaparecida = {
        id: localizacao.pessoaId || 1,
        nome: 'Nome da Pessoa',
        idade: 25,
        desaparecidoDesde: '2023-05-15',
        ultimoAvistamento: localizacao.avistamento?.dataAvistamento,
        descricao: 'Descrição da pessoa desaparecida com características físicas e informações relevantes.',
        contato: '(11) 99999-9999',
        foto: undefined
      };

      // Em produção, usar: const pessoa = await getPessoaDesaparecida(localizacao.pessoaId);
      setPessoaSelecionada(pessoaSimulada);
      
      // Rolar até os detalhes
      setTimeout(() => {
        const detalhesElement = document.getElementById('detalhes-pessoa');
        if (detalhesElement) {
          detalhesElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Erro ao carregar detalhes da pessoa:', err);
      alert('Não foi possível carregar os detalhes da pessoa.');
    }
  };

  const handleCloseDetalhes = () => {
    setPessoaSelecionada(null);
  };

  const handleReportarAvistamento = () => {
    // Implementar navegação para página de reportar avistamento
    alert('Funcionalidade de reportar avistamento será implementada.');
  };

  const handleCompartilhar = () => {
    // Implementar funcionalidade de compartilhamento
    if (navigator.share) {
      navigator.share({
        title: `Pessoa Desaparecida: ${pessoaSelecionada?.nome}`,
        text: `Ajude a encontrar ${pessoaSelecionada?.nome}. Desaparecido desde ${pessoaSelecionada?.desaparecidoDesde}.`,
        url: window.location.href
      });
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  useEffect(() => {
    carregarLocalizacoes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-800 mb-8">Localizações de Pessoas Desaparecidas</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa à esquerda em telas grandes, em cima em telas pequenas */}
        <div className="lg:col-span-2">
          <MapaLocalizacoes 
            localizacoes={localizacoes}
            onMarkerClick={handleLocalizacaoClick}
          />
        </div>

        {/* Lista de localizações à direita em telas grandes, embaixo em telas pequenas */}
        <div>
          <ListaLocalizacoes 
            localizacoes={localizacoes}
            onLocalizacaoClick={handleLocalizacaoClick}
            onRefresh={carregarLocalizacoes}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {/* Detalhes da pessoa desaparecida */}
      {pessoaSelecionada && (
        <div id="detalhes-pessoa">
          <DetalhesPessoa 
            pessoa={pessoaSelecionada}
            onClose={handleCloseDetalhes}
            onReportarAvistamento={handleReportarAvistamento}
            onCompartilhar={handleCompartilhar}
          />
        </div>
      )}
    </div>
  );
}
