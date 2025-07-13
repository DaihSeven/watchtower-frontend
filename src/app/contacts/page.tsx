/*
A ideia é colocar no final da página dois comentários mais o da pessoa se ela fizer e ter um all comentários que leva página contato com todos os comentários, feedbacks edenúncias....
*/
import { listContacts } from '@/lib/apicontact';
import ContactList from '@/components/ContactList';

export default async function ContatoPage() {
  const contatos = await listContacts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Contatos</h1>
      <ContactList contatos={contatos} />
    </div>
  );
}
//não está pegando as rotas frontend ainda
