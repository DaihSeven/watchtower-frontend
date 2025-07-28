import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});


api.interceptors.request.use((config) => {
  console.log('=== REQUISIÇÃO ===');
  console.log('URL:', config.url);
  console.log('Method:', config.method);
  console.log('Data:', config.data);
  console.log('Headers:', config.headers);
  
  
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  console.error('Erro na requisição:', error);
  return Promise.reject(error);
});


api.interceptors.response.use(
  (response) => {
    console.log('=== RESPOSTA SUCESSO ===');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response;
  },
  (error) => {
    console.error('=== RESPOSTA ERRO ===');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Headers:', error.response?.headers);
    return Promise.reject(error);
  }
);