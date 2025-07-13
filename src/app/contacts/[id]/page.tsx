'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchContactForId, updateContact, deleteContact } from '@/lib/apicontact';
import ContactForm from '@/components/ContactForm';

export default function DetailsContact() {
  const router = useRouter();
  const params = useParams();
  const [contact, setContact] = useState<any>(null);
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(true);

  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  useEffect(() => {
    if (id) {
      searchContactForId(id).then((data) => {
        setContact(data);
        setCarregando(false);
      });
    }
  }, [id]);

  async function handleUpdate(data: any) {
    try {
      await updateContact(id, data);
      setSucesso('Contato atualizado com sucesso!');

      setTimeout(() => {
        router.push('/contato');
      }, 2000); // Espera 2 segundos antes de redirecionar
    } catch {
      setSucesso('Erro ao atualizar contato.');
    }
  }

  async function handleDelete() {
    await deleteContact(id);
    router.push('/contato');
  }

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Editar Contato</h1>

      <ContactForm initialData={contact} onSubmit={handleUpdate} />

      {sucesso && <p className="text-green-600">{sucesso}</p>}

      <div className="flex gap-4 mt-4">
        <button onClick={handleDelete} className="text-red-600 underline">
          Deletar Contato
        </button>

        <button
          onClick={() => router.push('/contacts')}
          className="text-blue-600 underline"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
