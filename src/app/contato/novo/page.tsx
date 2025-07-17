'use client';
import { HiChevronDoubleLeft, HiClipboardCopy } from "react-icons/hi";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { criarContato } from '@/lib/apicontato';
import { ContactFormData } from '@/types/contato';
import ContatoForm from '@/components/ContatoForm';

export default function NovoContatoPage() {
  const router = useRouter();
  const [erro, setErro] = useState('');

  async function handleSubmit(data: ContactFormData) {
    try {
      await criarContato(data);
      alert('Contato criado com sucesso!');
      router.push('/contato');
    } catch {
      setErro('Erro ao criar contato.');
    }
  }

  return (
    <section className="p-4 bg-white">
      <h1 className="flex items-center gap-2 text-2xl text-[#000] font-bold my-4"><HiClipboardCopy />Novo Contato</h1>
      <ContatoForm onSubmit={handleSubmit} />
      {erro && <p className="text-red-500 mt-2">{erro}</p>}
      <button
          onClick={() => router.push('/contato')}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded  "
        ><HiChevronDoubleLeft />Voltar
      </button>
    </section>
  );
}
