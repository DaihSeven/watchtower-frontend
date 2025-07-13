'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginValidation, LoginValidation } from "@/utils/loginValidation";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValidation>({
    resolver: zodResolver(loginValidation),
  });

  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data: LoginValidation) => {
    try {
      const res = await loginUser(data.email, data.senha);
      login(res.token, res.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      <input type="password" {...register("senha")} placeholder="Senha" />
      <button type="submit">Entrar</button>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </form>
  );
}
