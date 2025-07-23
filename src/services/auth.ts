import { User, TipoUsuario } from '@/types/user';
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
    return responseLogin.data;
};

export const registerUser = async (nome: string, email: string, senha: string, tipo_usuario: TipoUsuario, senha_admin?: string) => {
    const responseRegister = await api.post(`/user/registrar`, {
        nome,
        email,
        senha,
        tipo_usuario,
        senha_admin
    });
    return responseRegister;
};