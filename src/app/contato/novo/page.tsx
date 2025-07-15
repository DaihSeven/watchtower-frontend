'use client';

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
    } catch (e: unknown) {
      setErro('Erro ao criar contato.');
    }
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Contato</h1>
      <ContatoForm onSubmit={handleSubmit} />
      {erro && <p className="text-red-500 mt-2">{erro}</p>}
    </section>
  );
}
