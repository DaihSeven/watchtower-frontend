//para rotas GET detalha, PUT edita e DELETE deleta
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchContactForId, updateContact, deleteContact } from '@/lib/apicontact';
import ContactForm from '@/components/ContactForm';

interface PageProps {
    readonly params: {
    readonly id: string;
  };
}

export default function DetalheContato({ params }: PageProps){
  const [contact, setContact] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    searchContactForId(params.id).then(setContact);
  }, [params.id]);

  async function handleUpdate(data: any) {
    await updateContact(params.id, data);
    router.push('/contato');
  }

  async function handleDelete() {
    await deleteContact(params.id);
    router.push('/contato');
  }

  if (!contact) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Contato</h1>
      <ContactForm initialData={contact} onSubmit={handleUpdate} />
      <button onClick={handleDelete} className="mt-4 text-red-500">
        Deletar Contato
      </button>
    </div>
  );
}
