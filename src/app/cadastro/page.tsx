"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  registerValidation,
  RegisterValidation,
} from "@/utils/registerValidation";
import { registerUser } from "@/services/auth";

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

  const onSubmit = async (data: RegisterValidation) => {
    try {
      await registerUser(
        data.nome,
        data.email,
        data.senha,
        data.tipo_usuario,
        data.senha_admin
      );
      router.push("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <section className="bg-[#ffffff] text-gray-700 w-full h-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2"
      >
        <input
          {...register("nome")}
          placeholder="Nome"
          className="input-base"
        />
        {errors.nome && <p>{errors.nome.message?.toString()}</p>}
        <input
          {...register("email")}
          placeholder="Email"
          className="input-base"
        />
        {errors.email && <p>{errors.email.message?.toString()}</p>}
        <input
          type="password"
          {...register("senha")}
          placeholder="Senha"
          className="input-base"
        />
        {errors.senha && <p>{errors.senha.message?.toString()}</p>}
        <select
          {...register("tipo_usuario")}
          className="rounded-lg border-(--main-color) border-solid border-2"
        >
          <option value="usuario">Usuário</option>
          <option value="admin">Admin</option>
        </select>
        {tipo_usuario === "admin" && (
          <input
            type="password"
            {...register("senha_admin")}
            placeholder="Senha de administrador"
            className="input-base"
          />
        )}
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Cadastrar
        </button>
        {/* {Object.keys(errors).length > 0 && (
          <pre className="text-red-500 bg-red-100 p-2 rounded">{JSON.stringify(errors, null, 2)}</pre>
        )} */}
      </form>
    </section>
  );
}
