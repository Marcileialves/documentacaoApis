# 🐟 PescFish API - Documentação Completa

[![Status](https://img.shields.io/badge/Status-Produção-00ff00?style=for-the-badge)](https://github.com/seu-usuario/pescfish-api-docs)
[![Version](https://img.shields.io/badge/Version-1.0.0-ff6b6b?style=for-the-badge)](https://github.com/seu-usuario/pescfish-api-docs)
[![Auth](https://img.shields.io/badge/Auth-JWT-ffd93d?style=for-the-badge)](https://github.com/seu-usuario/pescfish-api-docs)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://github.com/seu-usuario/pescfish-api-docs)

## 📖 Sobre o Projeto

Uma **documentação interativa e visualmente moderna** para a API do sistema **PescFish**, desenvolvida para facilitar o consumo dos endpoints por desenvolvedores e integradores.

### 🎯 Objetivo

Fornecer uma **referência completa e fácil de usar** para todos os endpoints da API, com:

- 📋 **Listagem organizada** por níveis de acesso (Público, Protegido, Admin)
- 🔍 **Busca rápida** por nome, caminho ou descrição
- 📘 **Exemplos de requisição e resposta** em JSON
- 🎨 **Design moderno** com cores por método HTTP
- 📱 **Responsivo** para uso em qualquer dispositivo
- ⚡ **Cópia rápida** de caminhos e exemplos

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **Next.js 14** | Framework React com App Router |
| **React 18** | Biblioteca para construção de interfaces |
| **CSS Modules** | Estilização local e organizada |
| **Google Fonts** | Fonte Inter para melhor legibilidade |
| **JWT** | Autenticação baseada em tokens |

---

## 📚 Estrutura da Documentação

### 🌐 Rotas Públicas
Endpoints que **não requerem autenticação**:
- Login e registro de usuários
- Recuperação de senha
- Visualização de produtos, categorias e marcas
- Consulta de fretes e endereços
- Listagem de comentários e suporte

### 🔒 Rotas Protegidas
Endpoints que **requerem token JWT válido**:
- Perfil do usuário (`/me`)
- Gerenciamento de carrinho
- Pedidos do cliente
- Gerenciamento de endereços
- Comentários e suporte do usuário

### 🛡️ Rotas Admin
Endpoints que **requerem privilégios de administrador**:
- Gerenciamento de usuários
- CRUD completo de produtos
- Gerenciamento de categorias e marcas
- Gestão de fornecedores
- Controle de fretes
- Visualização completa de pedidos
- Gestão de clientes

---

## 📊 Estatísticas

| Categoria | Quantidade |
|-----------|------------|
| 🌐 Rotas Públicas | 45 |
| 🔒 Rotas Protegidas | 35 |
| 🛡️ Rotas Admin | 55+ |
| **Total** | **135+** |

---

## 🔐 Autenticação

### Como Funciona

1. **Login:** `POST /login` com email e senha
2. **Receba o Token:** Resposta inclui token JWT
3. **Use o Token:** Header `Authorization: Bearer <token>`

### Exemplo de Login

```bash
POST /login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "senha": "senha123"
}
