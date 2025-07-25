
# 🛰️ Watchtower

Plataforma web para auxílio na localização de pessoas desaparecidas. Reúne uma API completa e um frontend interativo com mapa e gerenciamento de casos.

---

## 🧩 Problema

O desaparecimento de pessoas é um desafio grave no Brasil. A ausência de ferramentas digitais dificulta a coleta, organização e compartilhamento de informações entre familiares, autoridades e cidadãos. Faltam soluções acessíveis para registrar casos e colaborar em tempo real.

---

## 💡 Solução

O **Watchtower** centraliza os dados de pessoas desaparecidas e fornece funcionalidades para:

- Cadastro e visualização de casos
- Registro de avistamentos com localização geográfica
- Envio de mensagens e contatos com informações relevantes
- Gerenciamento com autenticação (admin e usuário comum)

---

## 🛰️ Apresentação do Sistema e Utilidade

O Watchtower é composto por:

- **Backend (API)** em Node.js com TypeScript, JWT e banco PostgreSQL via Prisma.
[https://github.com/DaihSeven/watchtower-backend.git](https://github.com/DaihSeven/watchtower-backend.git)
- **Frontend (Next.js)** moderno com mapas (Leaflet), autenticação (NextAuth) e formulários validados com React Hook Form + Zod.
[https://github.com/DaihSeven/watchtower-frontend.git](https://github.com/DaihSeven/watchtower-frontend.git)

A plataforma conecta autoridades, famílias e cidadãos com um objetivo comum: ajudar na busca e localização de pessoas desaparecidas com agilidade e segurança.

---

## 📦 Tecnologias Utilizadas

### 🔧 Backend (API)

- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- JWT (Autenticação)
- Swagger (Documentação interativa)
- bcrypt, cors, dotenv

### 🖥️ Frontend (App Web)

- Next.js 15 + Turbopack
- React 19
- Tailwind CSS 4
- React Hook Form + Zod
- NextAuth
- Leaflet (mapas)
- Axios, clsx, lucide-react, framer-motion, react-icons

---

## 🔗 Funcionalidades por Rota

### 👤 `/pessoas`
- **GET**: Lista pessoas desaparecidas
- **POST**: Cadastra uma nova pessoa
- **PATCH**: Atualiza dados de uma pessoa
- **DELETE**: Remove pessoa pelo ID  
> Gerencia os principais dados da pessoa desaparecida (nome, idade, data, descrição).

---

### 👀 `/avistamento`
- **GET**: Lista todos os avistamentos
- **POST**: Registra um novo avistamento
- **PATCH**: Atualiza um avistamento
- **DELETE**: Remove um avistamento  
> Permite relatar possíveis visualizações, com localização, nome do informante e comentário.

---

### 📍 `/localizacao`
- **GET**: Lista localizações
- **POST**: Registra nova localização
- **PUT**: Atualiza localização
- **DELETE**: Remove localização  
> Armazena latitude/longitude vinculadas a pessoas desaparecidas, exibidas em mapa interativo.

---

### 📞 `/contato`
- **GET**: Lista ou busca contatos por ID
- **POST**: Envia nova mensagem
- **PUT/DELETE**: Atualiza ou exclui contato  
> Permite que qualquer pessoa envie mensagens com informações, denúncias ou dúvidas.

---

### 🔐 `/user`
- **POST /registrar**: Cadastra novo usuário
- **POST /login**: Realiza login  
> Sistema básico de autenticação para acesso restrito a funções administrativas.

---

## 🧪 Documentação Swagger

Acesse e teste todos os endpoints com a documentação interativa:  
📍 `http://localhost:3000/api-docs`

[`https://watchtower-backend.onrender.com/api-docs/`](https://watchtower-backend.onrender.com/api-docs/)

---

## 🚀 Como Usar

### 1. Clone o repositório:
### 2. Instale as dependências:

Backend:

```bash
git clone https://github.com/DaihSeven/watchtower-backend.git
cd watchtower-backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Acesse: `http://localhost:3002`

Frontend:

```bash
git clone https://github.com/DaihSeven/watchtower-frontend.git
cd watchtower-frontend
npm install
npm run dev
```

Acesse: `http://localhost:3000`

---

# 🛠️🧠 Colaboradores
- Daiane das Graças Barbosa Koslowski;
- Felipe da Costa Xavier;
- Damaris Fernandez Condori;
- Maria Eduarda Lopes de Santa'anna;
- Igor Ximenes de Oliveira Rocha;
- Mateus Felipe dos Santos da Hora.


## 🔧 Melhorias Futuras

* ✅ Tornar/Arrumar o login **persistente** no frontend (salvar sessão e token).
* ✅ Tornar funcional a **restrição de ações (criar/editar/deletar)** apenas para usuários autenticados, que estão bloqueadas.
* 🐞 Corrigir a rota `/pessoas` que está diferente do backend no momento.
* 📲 Adicionar upload de imagem para perfis de desaparecidos.
* 📍 Melhorar visualização por filtros, datas, e conectar ao banco real no mapa de avistamentos(está sendo usando um apenas de demonstração).

  
- <i>(mudanças para a versão 2 ocorrendo na branch devsocketmage)</i>
---

## 🧠 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request com sugestões, bugs ou melhorias.

---

## 📄 Licença

MIT – Este projeto é de código aberto e livre para uso acadêmico e comunitário.

