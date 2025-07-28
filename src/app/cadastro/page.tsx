"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  registerValidation,
  RegisterValidation,
} from "@/utils/registerValidation";
import { registerUser } from "@/services/auth";
import { TipoUsuario } from "@/types/user";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterValidation>({
    resolver: zodResolver(registerValidation),
  });

  const router = useRouter();
  const tipo_usuario = watch("tipo_usuario");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const onSubmit = async (data: RegisterValidation) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("=== DEBUG CADASTRO ===");
      console.log("Dados do formulário:", data);
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      
      const response = await registerUser(
        data.nome,
        data.email,
        data.senha,
        data.tipo_usuario as TipoUsuario,
        data.senha_admin
      );
      
      console.log("Resposta do cadastro:", response);
      
      setSuccess("Cadastro realizado com sucesso! Redirecionando...");
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (error: any) {
      console.error("=== ERRO DETALHADO ===");
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      console.error("Headers:", error.response?.headers);
      console.error("Config:", error.config);
      console.error("Erro completo:", error);
      
      if (error.response?.data?.message) {
        setError(`Erro: ${error.response.data.message}`);
      } else if (error.response?.data?.error) {
        setError(`Erro: ${error.response.data.error}`);
      } else if (error.response?.data) {
        setError(`Erro: ${JSON.stringify(error.response.data)}`);
      } else if (error.response?.status === 400) {
        setError("Dados inválidos. Verifique as informações no console.");
      } else if (error.response?.status === 409) {
        setError("Email já cadastrado.");
      } else {
        setError(`Erro: ${error.message || "Erro desconhecido"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-user">
      <h1 className="text-5xl">Cadastro</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md text-center">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full max-w-md text-center">
            {success}
          </div>
        )}
        
        <input
          {...register("nome")}
          placeholder="Nome"
          className="input-base"
          disabled={isLoading}
        />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
        
        <input
          {...register("email")}
          placeholder="Email"
          className="input-base"
          disabled={isLoading}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        
        <input
          type="password"
          {...register("senha")}
          placeholder="Senha"
          className="input-base"
          disabled={isLoading}
        />
        {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}
        
        <select
          {...register("tipo_usuario")}
          className="rounded-lg border-blue-300 border-solid border-2 p-2 w-full max-w-md"
          disabled={isLoading}
          defaultValue=""
        >
          <option value="" disabled>Selecione o tipo</option>
          <option value="usuario">Usuário</option>
          <option value="admin">Admin</option>
        </select>
        {errors.tipo_usuario && <p className="text-red-500 text-sm">{errors.tipo_usuario.message}</p>}
        
        {tipo_usuario === "admin" && (
          <>
            <input
              type="password"
              {...register("senha_admin")}
              placeholder="Senha de administrador"
              className="input-base"
              disabled={isLoading}
            />
            {errors.senha_admin && <p className="text-red-500 text-sm">{errors.senha_admin.message}</p>}
          </>
        )}
        
        <button
          type="submit"
          className="button-form"
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </section>
  );
}