import { User } from '@/types/user';
import { api } from './api';

interface LoginResponse {
    token: string,
    usuario: User,
}

export const loginUser = async (email: string, senha: string): Promise<LoginResponse> => {
    const responseLogin = await api.post(`/user/login`, {
        email,
        senha,
    });
    return responseLogin.data; // espera { token, user, ...}
};

export const registerUser = async (nome: string, email: string, senha: string, tipo_usuario: string, senha_admin?: string) => {
    const responseRegister = await api.post(`/user/registrar`, {
        nome,
        email,
        senha,
        tipo_usuario,
        senha_admin
    });
    return responseRegister;
};