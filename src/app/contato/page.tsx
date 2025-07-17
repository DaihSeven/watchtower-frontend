import Link from "next/link";
import { CiViewList } from "react-icons/ci";
import { listarContatos } from '@/lib/apicontato';
import ContatoLista from '@/components/ContatoLista';

export default async function ContatoPage() {
  const contatos = await listarContatos();
  console.log('Contatos:', contatos);
    if (!contatos) {
        return <p>Erro ao carregar contatos.</p>;
    }

  return (
    <div className="p-4 bg-white shadow-md">
      <h1 className="flex items-center gap-2 text-2xl text-[#000] font-bold my-4"><CiViewList />Lista de Contatos</h1>
      <Link
    href="/contato/novo"
    className="inline-block my-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
  >
    + Novo Contato
  </Link>
      <ContatoLista contatos={contatos} />
     
    </div>
  );
}

