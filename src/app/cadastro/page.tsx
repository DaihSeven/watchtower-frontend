'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerValidation, RegisterValidation } from "@/utils/registerValidation";
import { registerUser } from "@/services/auth";

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterValidation>({
    resolver: zodResolver(registerValidation),
  });

  const router = useRouter();
  const tipo_usuario = watch("tipo_usuario");

  const onSubmit = async (data: RegisterValidation) => {
    try {
      await registerUser(data.nome, data.email, data.senha, data.tipo_usuario, data.senha_admin);
      router.push("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("nome")} placeholder="Nome" />
      <input {...register("email")} placeholder="Email" />
      <input type="password" {...register("senha")} placeholder="Senha" />
      <select {...register("tipo_usuario")}>
        <option value="usuario">Usuário</option>
        <option value="admin">Admin</option>
      </select>
      {tipo_usuario === "admin" && (
        <input type="password" {...register("senha_admin")} placeholder="Senha de admin" />
      )}
      <button type="submit">Cadastrar</button>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </form>
  );
}
