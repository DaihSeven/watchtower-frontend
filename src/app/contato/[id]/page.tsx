'use client';
import { HiChevronDoubleLeft, HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buscarContatoPorId, atualizarContato, deletaContato } from '@/lib/apicontato';
import ContatoForm from '@/components/ContatoForm';
import {  Contato, ContatoFormData } from '@/types/contato';

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

  async function handleUpdate(data: ContatoFormData) {
   try {
    if (!contact) return;

    const contatoAtualizado: Contato = {
      ...contact, 
      ...data,         
    };
      await atualizarContato(contatoAtualizado.id, contatoAtualizado);

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
    <section className="p-4 space-y-4 bg-white">
      <h1 className="flex items-center gap-2 my-4 text-2xl text-[#000] font-bold"><HiOutlinePencilAlt />Editar Contato</h1>

      <ContatoForm initialData={contact ?? undefined} onSubmit={handleUpdate} />

      {sucesso && <p className="text-green-600">{sucesso}</p>}

      <section className="flex gap-4 mt-4">
        <button onClick={handleDelete} className="flex items-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded "><HiTrash />Deletar Contato
        </button>

        <button
          onClick={() => router.push('/contato')}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded "
        ><HiChevronDoubleLeft />Voltar
        </button>
      </section>
    </section>
  );
}
