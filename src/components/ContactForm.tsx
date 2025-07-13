'use client';

import { useState } from 'react';

type Props = {
  readonly initialData?: any;
  readonly onSubmit: (data: any) => void;
};

export default function ContactForm({ initialData = {}, onSubmit }: Props) {
  const [form, setForm] = useState({
    nome: initialData.nome || '',
    email: initialData.email || '',
    telefone: initialData.telefone || '',
    mensagem: initialData.mensagem || '',
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="flex flex-col gap-2"
    >
      <input
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        required
        className="border p-2"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="border p-2"
      />
      <input
        placeholder="Telefone"
        value={form.telefone}
        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
        className="border p-2"
      />
      <textarea
        placeholder="Mensagem"
        value={form.mensagem}
        onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
        required
        className="border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Enviar
      </button>
    </form>
  );
}
