'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contatoSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  mensagem: z.string().min(10, 'Mensagem obrigatória'),
});

type ContatoFormData = z.infer<typeof contatoSchema>;

type Props = {
  readonly initialData?: Partial<ContatoFormData>;
  readonly onSubmit: (data: ContatoFormData) => void;
};

export default function ContatoForm({ initialData = {}, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema),
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-purple-700"
    >
      <input
        {...register('nome')}
        placeholder="Nome"
        className="border border-purple-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

      <input
        {...register('email')}
        placeholder="Email"
        className="border border-purple-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        {...register('telefone')}
        placeholder="Telefone"
        className="border border-purple-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}

      <textarea
        {...register('mensagem')}
        placeholder="Mensagem"
        rows={4}
        className="border border-purple-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {errors.mensagem && <p className="text-red-500 text-sm">{errors.mensagem.message}</p>}

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Enviar
      </button>
    </form>
  );
}
