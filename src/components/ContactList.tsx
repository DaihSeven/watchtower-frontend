import { Contato } from '@/types/contact';
import ContactItem from './ContactItem';

interface ContactListProps {
  readonly contatos: Contato[];
}

export default function ContactList({ contatos }: ContactListProps){
  if (!contatos.length) return <p>Nenhum contato encontrado.</p>;

  return (
    <ul className="space-y-3">
        {contatos.map((c) => (
            <ContactItem key={c.id} contato={c} />
        ))}
    </ul>
  );
}
