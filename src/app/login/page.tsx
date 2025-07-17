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
      login(res.token, res.usuario);
      console.log(res.usuario?.tipo_usuario)
      if(res.usuario?.tipo_usuario === 'admin') {
        router.push("/dashboard")
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <section className="section-user">
      <h1 className="text-5xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-user">
        <input {...register("email")} placeholder="Email"  className="input-base"/>
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register("senha")} placeholder="Senha"  className="input-base"/>
        {errors.senha && <p>{errors.senha.message}</p>}
        <button type="submit" className="button-form">Entrar</button>
        {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
      </form>
    </section>
  );
}
