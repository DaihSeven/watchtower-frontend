import { Contato } from '@/types/contact';

import ContactItem from './ContactItem';

interface ContatoListProps {
  readonly contatos: Contato[];
}

export default function ContatoList({ contatos }: ContatoListProps){
  if (!contatos.length) return <p>Nenhum contato encontrado.</p>;

  return (
    <ul className="space-y-2">
      {contatos.map((c) => (
        <ContactItem key={c.id} contato={c} />
      ))}
    </ul>
  );
}
