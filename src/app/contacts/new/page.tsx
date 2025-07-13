//Para rotas POST
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createContact } from '@/lib/apicontact';
import ContactForm from '@/components/ContactForm';

export default function NovoContatoPage() {
  const router = useRouter();
  const [erro, setErro] = useState('');

  async function handleSubmit(data: any) {
    try {
      await createContact(data);
      router.push('/contato');
    } catch (e) {
      setErro('Erro ao criar contato.');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Contato</h1>
      <ContactForm onSubmit={handleSubmit} />
      {erro && <p className="text-red-500 mt-2">{erro}</p>}
    </div>
  );
}
