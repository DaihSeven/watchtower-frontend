import axios from 'axios';
import { User } from '@/types/user';

const URL_API = 'https://watchtower-backend.onrender.com'; // Depois colocar a URL da API

interface LoginResponse {
    token: string,
    user: User,
}

export const loginUser = async (email: string, senha: string): Promise<LoginResponse> => {
    const responseLogin = await axios.post(`${URL_API}/user/login`, {
        email,
        senha,
    });
    return responseLogin.data; // espera { token, user, ...}
};

export const registerUser = async (nome: string, email: string, senha: string, tipo_usuario: string, senha_admin?: string) => {
    const responseRegister = await axios.post(`${URL_API}/user/registrar`, {
        nome,
        email,
        senha,
        tipo_usuario,
        senha_admin
    });
    return responseRegister;
};