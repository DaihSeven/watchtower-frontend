import Link from 'next/link';

export default function ContactItem({ contato }: { contato: any }) {
  return (
    <li className="border p-4 rounded shadow hover:bg-gray-50">
      <p><strong>{contato.nome}</strong></p>
      <p>{contato.email} — {contato.telefone}</p>
      <Link href={`/contacts/${contato.id}`} className="text-blue-600 underline">
        Ver / Editar
      </Link>
    </li>
  );
}
