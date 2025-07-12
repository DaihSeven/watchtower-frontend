"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  senha: string;
}

export default function Login() {
  const { register, formState: {errors}, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <body>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="text" {...register("email", { required: true })} aria-invalid={errors.email ? 'true' : 'false'} />
        {errors.email?.type === 'required' && (
            <p role="alert">Por favor, digite seu email</p>
        )}
        <label>Senha</label>
        <input type="password" {...register("senha", { required: true })} aria-invalid={errors.email ? 'true' : 'false'} />
        {errors.email?.type === 'required' && (
            <p role="alert">Por favor, digite sua senha</p>
        )}
        <input type="submit" />
      </form>
    </body>
  );
}
