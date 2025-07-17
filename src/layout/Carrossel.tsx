'use client';

import { useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { Pessoa } from '@/types/pessoas';

export default function Carrossel() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [current, setCurrent] = useState(0);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pessoas`);
        const dados = Array.isArray(response.data)
          ? response.data
          : response.data.pessoas;

        if (Array.isArray(dados)) {
          const embaralhadas = dados
            .toSorted(() => 0.5 - Math.random()) // preferível ao sort mutável
            .slice(0, 5);

          setPessoas(embaralhadas);
        } else {
          console.error('Formato inesperado:', response.data);
        }
      } catch (err) {
        const error = err as AxiosError;
        if (error.response) {
          console.error('Erro na resposta da API:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Erro na requisição (sem resposta):', error.request);
        } else {
          console.error('Erro ao configurar a requisição:', error.message);
        }
      }
    };

    fetchPessoas();
  }, []);

  const startAutoRotate = () => {
    if (intervaloRef.current) return; // já está rodando
    intervaloRef.current = setInterval(() => {
      setCurrent((prev) => (prev === pessoas.length - 1 ? 0 : prev + 1));
    }, 5 * 60 * 1000);
  };

  const pauseAutoRotate = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  useEffect(() => {
    if (pessoas.length > 0) {
      startAutoRotate();
    }
    return () => pauseAutoRotate();
  }, [pessoas]);

  const total = pessoas.length;

  const prevSlide = () => {
    pauseAutoRotate();
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    startAutoRotate();
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const pessoaAtual = pessoas[current] ?? null;

  if (!pessoaAtual) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Carregando pessoas desaparecidas...</p>
      </div>
    );
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800">Pessoas desaparecidas</h2>
        <p className="text-gray-600 mt-2">Se avistar, entre em contato</p>
      </div>

      <div className="relative w-full max-w-2xl mx-auto p-8 bg-blue-50 rounded-xl shadow-md">
        <div className="transition-all duration-500 text-center space-y-2">
          <p className="text-xl text-blue-900 font-semibold">{pessoaAtual.nome}</p>
          {pessoaAtual.idade && (
            <p className="text-base text-gray-800">Idade: {pessoaAtual.idade}</p>
          )}
          {pessoaAtual.descricao && (
            <p className="text-base text-gray-700">{pessoaAtual.descricao}</p>
          )}
          {pessoaAtual.ultimaLocalizacao && (
            <p className="text-base text-gray-600">
              Última localização: {pessoaAtual.ultimaLocalizacao}
            </p>
          )}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-blue-700 hover:bg-blue-100 p-3 rounded-full shadow-md transition"
        >
          &#10094;
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-blue-700 hover:bg-blue-100 p-3 rounded-full shadow-md transition"
        >
          &#10095;
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {pessoas.map((p) => (
            <button
              key={p.id || p.nome} // precisa ser único
              onClick={() => {
                pauseAutoRotate();
                setCurrent(pessoas.indexOf(p));
              }}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                pessoas.indexOf(p) === current ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Ir para o slide ${p.nome}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
