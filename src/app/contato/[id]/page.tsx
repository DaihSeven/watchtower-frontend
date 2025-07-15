'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buscarContatoPorId, atualizarContato, deletaContato } from '@/lib/apicontato';
import ContatoForm from '@/components/ContatoForm';
import { Contato } from '@/types/contato';

export default function DetalhesContato() {
  const router = useRouter();
  const params = useParams();
  const [contact, setContact] = useState<Contato | null>(null);
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(true);

  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  useEffect(() => {
    if (id) {
      buscarContatoPorId(id).then((data) => {
        setContact(data);
        setCarregando(false);
      });
    }
  }, [id]);

  async function handleUpdate(data: any) {
    try {
      await atualizarContato(id, data);
      setSucesso('Contato atualizado com sucesso!');

      setTimeout(() => {
        router.push('/contato');
      }, 2000);
    } catch {
      setSucesso('Erro ao atualizar contato.');
    }
  }

  async function handleDelete() {
    await deletaContato(id);
    router.push('/contato');
  }

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Editar Contato</h1>

      <ContatoForm initialData={contact ?? undefined} onSubmit={handleUpdate} />

      {sucesso && <p className="text-green-600">{sucesso}</p>}

      <div className="flex gap-4 mt-4">
        <button onClick={handleDelete} className="bg-red-600 text-white font-semibold py-2 px-4 rounded ">
          Deletar Contato
        </button>

        <button
          onClick={() => router.push('/contato')}
          className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded "
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
