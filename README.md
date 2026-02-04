# 🔐 Auth API – Access & Refresh Token

API de autenticação completa desenvolvida para portfólio backend, utilizando **Node.js**, **Express**, **Sequelize** e **JWT**, com **access token curto**, **refresh token persistido no banco** e **logout real**.

> Projeto focado em boas práticas, segurança, organização de código e padrões usados em aplicações reais.

---

## 🚀 Tecnologias

* Node.js
* Express
* PostgreSQL
* Sequelize ORM
* JWT (Access Token + Refresh Token)
* bcryptjs
* dotenv

---

## 🧠 Conceitos aplicados

* Autenticação com JWT
* Hash de senha (bcrypt)
* Access Token de curta duração
* Refresh Token de longa duração
* Persistência de refresh token no banco
* Revogação de sessão (logout real)
* Middleware de autenticação
* Arquitetura em camadas (Controller / Service / Model)

---

## 📁 Estrutura do projeto

```
src/
 ├── config/
 │    └── database.js
 ├── models/
 │    ├── User.js
 │    └── RefreshToken.js
 ├── controllers/
 │    └── auth.controller.js
 ├── services/
 │    └── auth.service.js
 ├── middlewares/
 │    ├── auth.middleware.js
 │    └── error.middleware.js
 ├── utils/
 │    └── token.js
 ├── routes/
 │    └── auth.routes.js
 ├── app.js
 └── server.js
```

---

## ⚙️ Configuração do ambiente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/auth-api.git
cd auth-api
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333

DB_NAME=auth_db
DB_USER=postgres
DB_PASS=postgres
DB_HOST=localhost

JWT_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret
```

### 4️⃣ Rodar a aplicação

```bash
npm run dev
```

A API estará disponível em:

```
http://localhost:3333
```

---

## 🔐 Fluxo de autenticação

### 🔹 Login

* Valida credenciais
* Gera **access token (15 min)**
* Gera **refresh token (7 dias)**
* Salva refresh token no banco

### 🔹 Uso normal

* Frontend usa access token para acessar rotas protegidas

### 🔹 Expiração do access token

* Frontend envia refresh token
* API valida no banco
* API gera novo access token

### 🔹 Logout

* Refresh token é removido do banco
* Sessão é invalidada

---

## 🛣 Rotas da API

### 🔓 Auth

| Método | Rota             | Descrição                 |
| ------ | ---------------- | ------------------------- |
| POST   | `/auth/register` | Criar usuário             |
| POST   | `/auth/login`    | Login e geração de tokens |
| POST   | `/auth/refresh`  | Gerar novo access token   |
| POST   | `/auth/logout`   | Logout e revogação        |

### 🔒 Protegida

| Método | Rota       | Descrição                    |
| ------ | ---------- | ---------------------------- |
| GET    | `/auth/me` | Dados do usuário autenticado |

---

## 🧪 Exemplos de JSON (Postman)

### Login

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### Refresh token

```json
{
  "refreshToken": "SEU_REFRESH_TOKEN"
}
```

### Header para rotas protegidas

```
Authorization: Bearer ACCESS_TOKEN
```

---

## 🛡 Segurança

* Senhas nunca são armazenadas em texto puro
* Tokens curtos reduzem impacto de vazamento
* Refresh token persistido permite revogação
* Logout invalida sessão no backend

---

## 📌 Diferenciais do projeto

* Não usa token infinito
* Logout real (revogação no banco)
* Código organizado e escalável
* Pronto para produção e expansão

---

## 📈 Possíveis melhorias

* Cookies httpOnly para refresh token
* Confirmação de e-mail
* Recuperação de senha
* Roles (admin / user)
* Testes automatizados (Jest)

---

## 👨‍💻 Autor

**Marcos Richelly**

Projeto desenvolvido para fins de estudo e portfólio backend.
