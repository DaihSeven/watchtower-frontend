'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginValidation, LoginValidation } from "@/utils/loginValidation";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValidation>({
    resolver: zodResolver(loginValidation),
  });

  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (data: LoginValidation) => {
    setIsLoading(true);
    setError("");
    
    try {
      console.log("Tentando login com:", data.email);
      const res = await loginUser(data.email, data.senha);
      
      console.log("Resposta do login:", res);
      
      if (!res.token) {
        throw new Error("Token não recebido do servidor");
      }
      
      login(res.token, res.usuario);
      
      console.log("Usuário logado:", res.usuario);
      
      if (res.usuario?.tipo_usuario === 'admin') {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      
    } catch (error: any) {
      console.error("Erro no login:", error);
      
      if (error.response?.status === 401) {
        setError("Email ou senha incorretos");
      } else if (error.response?.status === 404) {
        setError("Usuário não encontrado");
      } else {
        setError(error.message || "Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-user">
      <h1 className="text-5xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-user">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
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
        
        <button 
          type="submit" 
          className="button-form"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
}
/**
 * ARQUIVOS ALTERADOS:
 * Login e Cadastro, , middlewares, context, utils, services, types todos referente a login e cadastro.
 * Na hora do do token estava sendo buscado nos cookies e não no localstorage, foi alterado. 
 * Mas não foi resolvido, foi melhorado o retorno de erros, o usuário ao cadastrar dá esse erro: "
 * Erro: Invalid `prisma.uSER.create()` invocation: Error converting field "tipo_usuario" of expected non-nullable type "String", found incompatible value of "usuario"."
 * no prisma está enum, e aqui no front também, então não faz sentido esse string a princípio, já que foi igualado os tipos
 * esse ao tentar recadastrar, pq já entrou no BD: "Erro: Invalid `prisma.uSER.create()` invocation: Unique constraint failed on the fields: (`email`)", mas ao tentar fazer login não permite por senha ou email incorreto.
 */