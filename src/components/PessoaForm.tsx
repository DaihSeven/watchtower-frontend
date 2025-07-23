'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { PessoaDesaparecida } from "@/types/pessoas";

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  idade: z.coerce.number().min(1, "Idade deve ser maior que zero."),
  dataDesaparecimento: z.string().min(10, "Data inválida (use formato YYYY-MM-DD)"),
  descricao: z.string().optional(),
  status: z.enum(["ATIVO", "ENCONTRADO"]),
  imagemUrl: z.string().url("Insira uma URL válida").or(z.literal("")).optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  pessoa?: PessoaDesaparecida;
}

export function PessoaForm({ pessoa }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...pessoa,
      status: pessoa?.status || "ATIVO",
      imagemUrl: pessoa?.imagemUrl || "",
    },
  });

  const router = useRouter();

 async function onSubmit(data: FormData) {
  try {
    if (pessoa) {
      await api.patch(`/pessoas/atualizar/${pessoa.id}`, data); 
    } else {
      await api.post("/pessoas/cadastrar", data);
    }
    router.push("/pessoas");
  } catch (error) {
    console.error("Erro ao salvar pessoa:", error);
  }
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("nome")} placeholder="Nome" className="input" />
      {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

      <input type="number" {...register("idade")} placeholder="Idade" className="input" />
      {errors.idade && <p className="text-red-500">{errors.idade.message}</p>}

      <input type="date" {...register("dataDesaparecimento")} className="input" />
      {errors.dataDesaparecimento && <p className="text-red-500">{errors.dataDesaparecimento.message}</p>}

      <textarea {...register("descricao")} placeholder="Descrição" className="input" />

      <input {...register("imagemUrl")} placeholder="URL da imagem" className="input" />
      {errors.imagemUrl && <p className="text-red-500">{errors.imagemUrl.message}</p>}

      <select {...register("status")} className="input">
        <option value="ATIVO">Ativo</option>
        <option value="ENCONTRADO">Encontrado</option>
      </select>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {pessoa ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
}
