import axios from 'axios';
//import { api } from '@/services/api';

export const testApiConnection = async (url: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.get(url, { timeout: 20000 });
    if (response.status === 200) {
      return { success: true, message: 'Conexão bem-sucedida!' };
    } else {
      return { success: false, message: `Resposta inesperada: ${response.status}` };
    }
  } catch (error: unknown) {
    console.error('Erro ao testar conexão:', error); 

    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { success: false, message: `Erro: ${error.response.status} - ${error.response.statusText}` };
      } else if (error.request) {
        return { success: false, message: 'Sem resposta da API (timeout ou rede).' };
      }
    }
    return { success: false, message: 'Erro ao conectar com a API.' };
  }
};