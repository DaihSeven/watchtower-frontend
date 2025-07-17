'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { Pessoa } from '@/types/pessoas';

export default function Carrossel() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await axios.get('https://watchtower-backend.onrender.com/pessoas');
        console.log('Resposta da API:', response.data);

        const dados = Array.isArray(response.data)
          ? response.data
          : response.data.pessoas;

        if (Array.isArray(dados)) {
          setPessoas(dados);
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

  const total = pessoas.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
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
          {/* Você pode reativar estas linhas se os dados forem válidos */}
          {/* {pessoaAtual.ultimaLocalizacao && (
            <p className="text-base text-gray-800">
              Última localização: {pessoaAtual.ultimaLocalizacao}
            </p>
          )}
          <p className="text-sm text-gray-600 italic">
            Desaparecido desde: {pessoaAtual.desaparecidoDesde}
          </p> */}
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
          {pessoas.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === current ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
