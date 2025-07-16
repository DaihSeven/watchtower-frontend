import { Contato } from '@/types/contato';
import ContatoItem from './ContatoItem';

interface ContatoListaProps {
  readonly contatos: Contato[];
}

export default function ContatoLista({ contatos }: ContatoListaProps){
  if (!contatos.length) return <p>Nenhum contato encontrado.</p>;

  return (
    <ul className="space-y-3">
        {contatos.map((c) => (
            <ContatoItem key={c.id} contato={c} />
        ))}
    </ul>
  );
}
