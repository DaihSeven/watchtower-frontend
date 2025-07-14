export interface User {
    id: number,
    nome: string,
    email: string,
    tipo_usuario: 'admin' | 'usuario',
}