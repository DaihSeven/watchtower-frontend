/*
A ideia é colocar no final da página dois comentários mais o da pessoa se ela fizer e ter um all comentários que leva página contato com todos os comentários, feedbacks edenúncias....
*/
import { listarContatos } from '@/lib/apicontato';
import ContatoLista from '@/components/ContatoLista';
import { useAuth } from "@/context/AuthContext";

const { user } = useAuth();
export default async function ContatoPage() {
  const contatos = await listarContatos();
  console.log('Contatos:', contatos);
    if (!contatos) {
        return <p>Erro ao carregar contatos.</p>;
    }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Contatos</h1>
      <ContatoLista contatos={contatos} />
    </div>
  );
}

