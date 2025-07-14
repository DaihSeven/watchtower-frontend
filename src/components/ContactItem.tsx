import Link from 'next/link';
import { Contato } from '@/types/contact';

export default function ContactItem({ contato }: { contato: Contato }) {
  return (
    <li className="border border-purple-200 bg-white p-4 rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
      <p className="font-semibold text-purple-800">{contato.nome}</p>
      <p className="text-purple-700 text-sm">
        {contato.email} — {contato.telefone || 'Sem telefone'}
      </p>
      <Link
        href={`/contacts/${contato.id}`}
        className="inline-block mt-2 text-purple-600 hover:text-purple-800 underline text-sm font-medium"
      >
        Ver / Editar
      </Link>
    </li>
  );
}
