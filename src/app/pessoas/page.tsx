'use client'

import { useEffect, useState } from 'react'
import { Pessoa } from '@/types/pessoas'
import { getPessoas } from '@/services/pessoas'
import Link from 'next/link'
import { HiPlusCircle } from 'react-icons/hi'
import { PessoaCard } from '@/components/PessoaCard'

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregarPessoas() {
      try {
        const dados = await getPessoas()
        setPessoas(dados)
      } catch (error) {
        console.error('Erro ao carregar pessoas:', error)
        setErro('Erro ao buscar pessoas. Tente novamente mais tarde.')
      }
    }

    carregarPessoas()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pessoas Desaparecidas</h1>
        <Link href="/pessoas/nova">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
            <HiPlusCircle className="text-xl" />
            Nova Pessoa
          </button>
        </Link>
      </div>

      {erro && (
        <div className="text-red-600 font-medium mb-4">
          {erro}
        </div>
      )}

      {pessoas.length === 0 && !erro ? (
        <p className="text-gray-600">Nenhuma pessoa cadastrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pessoas.map((pessoa) => (
            <PessoaCard
              key={pessoa.id}
              pessoa={pessoa}
              onDelete={() => {
                }}
              onEdit={() => {
                
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
