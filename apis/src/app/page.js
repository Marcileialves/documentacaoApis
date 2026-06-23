'use client'
// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './page.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('publicas');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  // ==================== ENDPOINTS COMPLETOS ====================
  const endpoints = {
    // ---------- ROTAS PÚBLICAS ----------
    publicas: [
      { 
        method: 'GET', 
        path: '/', 
        description: 'Lista todas as rotas disponíveis' 
      },
      { 
        method: 'POST', 
        path: '/login', 
        description: 'Autentica um usuário e retorna token JWT',
        body: {
          email: 'usuario@email.com',
          senha: 'senha123'
        },
        response: {
          mensagem: 'Login realizado com sucesso!',
          token: 'eyJhbGciOiJIUzI1NiIs...',
          usuario: {
            id: 1,
            email: 'usuario@email.com',
            tipo: 'cliente',
            nivel_acesso: 0
          }
        }
      },
      { 
        method: 'POST', 
        path: '/registrar', 
        description: 'Cria um novo usuário do tipo cliente',
        body: {
          nome: 'Nome do Cliente',
          email: 'cliente@email.com',
          senha: 'senha123',
          cpf: '12345678900',
          telefone: '(69) 99999-9999',
          data_nascimento: '1990-01-01'
        },
        response: {
          mensagem: 'Usuário registrado com sucesso!',
          usuario: {
            id: 1,
            email: 'cliente@email.com',
            nome: 'Nome do Cliente',
            tipo: 'cliente'
          }
        }
      },
      { 
        method: 'POST', 
        path: '/esqueci-senha', 
        description: 'Gera token para recuperação de senha',
        body: {
          email: 'usuario@email.com'
        },
        response: {
          mensagem: 'Token de recuperação gerado com sucesso!',
          token_recuperacao: 'eyJhbGciOiJIUzI1NiIs...',
          link_recuperacao: 'http://apipescfish.dev.vilhena.ifro.edu.br/resetar-senha.html?token=...'
        }
      },
      { 
        method: 'POST', 
        path: '/resetar-senha', 
        description: 'Altera a senha usando token de recuperação',
        body: {
          token: 'eyJhbGciOiJIUzI1NiIs...',
          nova_senha: 'novaSenha123'
        },
        response: {
          mensagem: 'Senha alterada com sucesso!'
        }
      },
      { 
        method: 'POST', 
        path: '/verificar-token', 
        description: 'Verifica se o token JWT é válido',
        body: {
          token: 'eyJhbGciOiJIUzI1NiIs...'
        },
        response: {
          valido: true,
          payload: {
            id: 1,
            tipo: 'cliente',
            nivel_acesso: 0
          }
        }
      },
      
      // Produtos
      { 
        method: 'GET', 
        path: '/produtos', 
        description: 'Lista todos os produtos com filtros (categoria, marca, preço, etc.)' 
      },
      { 
        method: 'GET', 
        path: '/produtos/:id', 
        description: 'Busca um produto específico por ID' 
      },
      
      // Categorias
      { 
        method: 'GET', 
        path: '/categoria', 
        description: 'Lista todas as categorias' 
      },
      { 
        method: 'GET', 
        path: '/categoria/:id', 
        description: 'Busca categoria por ID' 
      },
      { 
        method: 'GET', 
        path: '/categoria/nome/:nome', 
        description: 'Busca categorias por nome' 
      },
      
      // Marcas
      { 
        method: 'GET', 
        path: '/marcas', 
        description: 'Lista todas as marcas' 
      },
      
      // Frete
      { 
        method: 'GET', 
        path: '/frete', 
        description: 'Lista todos os fretes com filtros (tipo, status, etc.)' 
      },
      { 
        method: 'GET', 
        path: '/frete/id/:id', 
        description: 'Busca um frete específico por ID' 
      },
      { 
        method: 'GET', 
        path: '/frete/tipo/:tipo', 
        description: 'Busca fretes por tipo (EXPRESSO, NORMAL, etc.)' 
      },
      { 
        method: 'GET', 
        path: '/frete/status/:status', 
        description: 'Busca fretes por status (ativo/inativo)' 
      },
      { 
        method: 'GET', 
        path: '/frete/ativos', 
        description: 'Lista apenas fretes ativos' 
      },
      { 
        method: 'GET', 
        path: '/frete/preco/:min/:max', 
        description: 'Busca fretes por faixa de preço' 
      },
      { 
        method: 'GET', 
        path: '/frete/prazo/:dias', 
        description: 'Busca fretes com prazo máximo de X dias' 
      },
      { 
        method: 'GET', 
        path: '/frete/mais-barato', 
        description: 'Retorna a opção de frete mais barata' 
      },
      { 
        method: 'GET', 
        path: '/frete/mais-rapido', 
        description: 'Retorna a opção de frete mais rápida' 
      },
      
      // Endereços (Públicos)
      { 
        method: 'GET', 
        path: '/endereco/status/ativos', 
        description: 'Lista todos os endereços ativos' 
      },
      { 
        method: 'GET', 
        path: '/endereco/cidade/:cidade', 
        description: 'Busca endereços por cidade' 
      },
      { 
        method: 'GET', 
        path: '/endereco/estado/:estado', 
        description: 'Busca endereços por estado (UF)' 
      },
      { 
        method: 'GET', 
        path: '/endereco/cep/:cep', 
        description: 'Busca endereços por CEP' 
      },
      { 
        method: 'GET', 
        path: '/endereco', 
        description: 'Lista todos os endereços com filtros' 
      },
      { 
        method: 'GET', 
        path: '/endereco/:id', 
        description: 'Busca um endereço específico por ID' 
      },
      
      // Suporte
      { 
        method: 'GET', 
        path: '/suporte', 
        description: 'Lista todos os chamados de suporte' 
      },
      
      // Comentários
      { 
        method: 'GET', 
        path: '/comentarios', 
        description: 'Lista todos os comentários' 
      },
      
      // Pagamentos
      { 
        method: 'GET', 
        path: '/pagamento', 
        description: 'Lista pagamentos com filtros (pedido, método, status, etc.)' 
      },
      { 
        method: 'GET', 
        path: '/pagamento/:id', 
        description: 'Busca um pagamento específico por ID' 
      },
      { 
        method: 'GET', 
        path: '/pagamento/pedido/:pedidoId', 
        description: 'Busca pagamentos de um pedido específico' 
      },
      { 
        method: 'GET', 
        path: '/pagamento/metodo/:metodo', 
        description: 'Busca pagamentos por método (Pix, Cartao, Boleto)' 
      },
      { 
        method: 'GET', 
        path: '/pagamento/status/:status', 
        description: 'Busca pagamentos por status (Aguardando, Pago, etc.)' 
      },
      { 
        method: 'GET', 
        path: '/pagamento/pendentes', 
        description: 'Lista todos os pagamentos pendentes' 
      },
      { 
        method: 'GET', 
        path: '/pagamento/confirmados', 
        description: 'Lista todos os pagamentos confirmados' 
      },
      { 
        method: 'GET', 
        path: '/pagamento/resumo-financeiro', 
        description: 'Retorna um resumo financeiro (com filtro de data)' 
      },
      { 
        method: 'POST', 
        path: '/pagamento', 
        description: 'Cria um novo pagamento',
        body: {
          pedido_idpedido: 1,
          metodo: 'Pix',
          valor_pago: 150.00,
          status_pagamento: 'Aguardando'
        },
        response: {
          sucesso: true,
          mensagem: 'Pagamento criado com sucesso',
          id: 1
        }
      },
      { 
        method: 'PUT', 
        path: '/pagamento/:id', 
        description: 'Atualiza completamente um pagamento',
        body: {
          pedido_idpedido: 1,
          metodo: 'Cartao',
          valor_pago: 150.00,
          status_pagamento: 'Pago'
        },
        response: {
          sucesso: true,
          mensagem: 'Pagamento atualizado com sucesso'
        }
      },
      { 
        method: 'PATCH', 
        path: '/pagamento/:id', 
        description: 'Atualiza parcialmente um pagamento',
        body: {
          status_pagamento: 'Pago',
          data_pagamento: '2024-01-20 14:30:00'
        },
        response: {
          sucesso: true,
          mensagem: 'Pagamento atualizado com sucesso'
        }
      },
      { 
        method: 'PATCH', 
        path: '/pagamento/:id/confirmar', 
        description: 'Confirma um pagamento (status Pago)',
        body: {
          data_pagamento: '2024-01-20 14:30:00'
        },
        response: {
          sucesso: true,
          mensagem: 'Pagamento confirmado com sucesso'
        }
      },
      { 
        method: 'PATCH', 
        path: '/pagamento/:id/cancelar', 
        description: 'Cancela um pagamento (status Cancelado)',
        response: {
          sucesso: true,
          mensagem: 'Pagamento cancelado com sucesso'
        }
      },
      { 
        method: 'PATCH', 
        path: '/pagamento/:id/falhar', 
        description: 'Marca um pagamento como falho (status Falhou)',
        response: {
          sucesso: true,
          mensagem: 'Pagamento marcado como falha'
        }
      },
      { 
        method: 'PATCH', 
        path: '/pagamento/:id/reembolsar', 
        description: 'Reembolsa um pagamento (status Reembolsado)',
        response: {
          sucesso: true,
          mensagem: 'Pagamento reembolsado com sucesso'
        }
      },
      { 
        method: 'DELETE', 
        path: '/pagamento/:id', 
        description: 'Deleta um pagamento' 
      },
      
      // Fornecedores
      { 
        method: 'GET', 
        path: '/fornecedores', 
        description: 'Lista todos os fornecedores' 
      },
    ],

    // ---------- ROTAS PROTEGIDAS (REQUEREM TOKEN) ----------
    protegidas: [
      // Usuário
      { 
        method: 'GET', 
        path: '/me', 
        description: 'Busca informações do usuário autenticado',
        response: {
          usuario: {
            id: 1,
            email: 'usuario@email.com',
            tipo: 'cliente',
            status: 1,
            data_cadastro: '2024-01-15 14:30:00',
            nome: 'Nome do Cliente',
            cpf: '12345678900',
            telefone: '(69) 99999-9999',
            data_nascimento: '1990-01-01'
          }
        }
      },
      { 
        method: 'PUT', 
        path: '/alterar-senha', 
        description: 'Altera a senha do usuário autenticado',
        body: {
          senha_atual: 'senha_antiga_123',
          nova_senha: 'nova_senha_456'
        },
        response: {
          mensagem: 'Senha alterada com sucesso!'
        }
      },
      { 
        method: 'POST', 
        path: '/logout', 
        description: 'Realiza logout (apenas instrução - remover token)',
        response: {
          mensagem: 'Logout realizado com sucesso!',
          instrucao: 'Remova o token do armazenamento local no frontend.'
        }
      },
      
      // Carrinho
      { 
        method: 'GET', 
        path: '/carrinho/me', 
        description: 'Busca o carrinho do usuário autenticado',
        response: {
          sucesso: true,
          itens: [
            {
              produto_id: 1,
              nome_produto: 'Peixe Fresco',
              preco: 35.90,
              quantidade: 2,
              subtotal: 71.80,
              estoque_disponivel: 100
            }
          ],
          total: 71.80,
          quantidade_itens: 2
        }
      },
      { 
        method: 'GET', 
        path: '/carrinho/me/validar', 
        description: 'Valida o carrinho (verifica estoque, etc.)',
        response: {
          sucesso: true,
          valido: true,
          mensagem: 'Carrinho válido'
        }
      },
      { 
        method: 'GET', 
        path: '/carrinho/me/resumo', 
        description: 'Resumo do carrinho (totais, quantidades)',
        response: {
          sucesso: true,
          total_itens: 2,
          total_produtos: 2,
          valor_total: 71.80
        }
      },
      { 
        method: 'POST', 
        path: '/carrinho', 
        description: 'Adiciona um produto ao carrinho',
        body: {
          produto_id: 1,
          quantidade: 2
        },
        response: {
          sucesso: true,
          mensagem: 'Produto adicionado ao carrinho'
        }
      },
      { 
        method: 'PATCH', 
        path: '/carrinho', 
        description: 'Atualiza a quantidade de um produto no carrinho',
        body: {
          produto_id: 1,
          quantidade: 3
        },
        response: {
          sucesso: true,
          mensagem: 'Quantidade atualizada com sucesso'
        }
      },
      { 
        method: 'DELETE', 
        path: '/carrinho/:produto_id', 
        description: 'Remove um produto do carrinho' 
      },
      { 
        method: 'DELETE', 
        path: '/carrinho/me/limpar', 
        description: 'Limpa todo o carrinho do usuário' 
      },
      
      // Pedidos
      { 
        method: 'GET', 
        path: '/pedidos/me', 
        description: 'Lista todos os pedidos do usuário autenticado',
        response: {
          sucesso: true,
          total: 2,
          pedidos: [
            {
              idpedido: 1,
              data_pedido: '2024-01-20 15:30:00',
              status_pedido: 'Entregue',
              valor_total: 150.50,
              produtos: [
                {
                  nome_produto: 'Peixe Fresco',
                  quantidade: 2,
                  preco_unitario: 35.90,
                  subtotal: 71.80
                }
              ]
            }
          ]
        }
      },
      { 
        method: 'GET', 
        path: '/pedidos/:id', 
        description: 'Busca um pedido específico (apenas do usuário ou admin)',
        response: {
          sucesso: true,
          pedido: {
            idpedido: 1,
            data_pedido: '2024-01-20 15:30:00',
            status_pedido: 'Pendente',
            valor_total: 71.80,
            Frete_idFrete: 1,
            Endereco_idEndereco: 1,
            produtos: [
              {
                produto_id: 1,
                nome_produto: 'Peixe Fresco',
                quantidade: 2,
                preco_unitario: 35.90,
                subtotal: 71.80
              }
            ]
          }
        }
      },
      { 
        method: 'POST', 
        path: '/pedidos', 
        description: 'Cria um novo pedido a partir do carrinho',
        body: {
          Frete_idFrete: 1,
          Endereco_idEndereco: 1,
          produtos: [
            { produto_id: 1, quantidade: 2 },
            { produto_id: 2, quantidade: 1 }
          ],
          observacoes: 'Sem troco'
        },
        response: {
          sucesso: true,
          mensagem: 'Pedido criado com sucesso!',
          idpedido: 1
        }
      },
      
      // Clientes
      { 
        method: 'GET', 
        path: '/clientes/me', 
        description: 'Busca os dados do cliente autenticado',
        response: {
          idcliente: 1,
          nome_cliente: 'Nome do Cliente',
          cpf_cliente: '12345678900',
          telefone_cliente: '(69) 99999-9999',
          data_nascimento: '1990-01-01',
          email: 'cliente@email.com'
        }
      },
      { 
        method: 'GET', 
        path: '/clientes/:id', 
        description: 'Busca um cliente específico (admin ou próprio perfil)' 
      },
      { 
        method: 'PUT', 
        path: '/clientes/:id', 
        description: 'Atualiza completamente um cliente',
        body: {
          nome_cliente: 'Novo Nome',
          cpf_cliente: '12345678900',
          telefone_cliente: '(69) 99999-9999',
          data_nascimento: '1990-01-01'
        },
        response: {
          mensagem: 'Cliente atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/clientes/:id', 
        description: 'Atualiza parcialmente um cliente',
        body: {
          nome_cliente: 'Novo Nome',
          telefone_cliente: '(69) 88888-8888'
        },
        response: {
          mensagem: 'Cliente atualizado com sucesso!'
        }
      },
      
      // Endereços (Protegidos)
      { 
        method: 'GET', 
        path: '/enderecos/me', 
        description: 'Busca todos os endereços do usuário autenticado',
        response: {
          sucesso: true,
          total: 2,
          dados: [
            {
              idEndereco: 1,
              cep: '78998000',
              logradouro: 'Rua Exemplo',
              numero: '123',
              bairro: 'Centro',
              cidade: 'Vilhena',
              estado: 'RO',
              complemento: 'Apto 101',
              padrao: 1,
              ativo: 1
            }
          ]
        }
      },
      { 
        method: 'GET', 
        path: '/endereco/cliente/:clienteId', 
        description: 'Busca endereços de um cliente específico' 
      },
      { 
        method: 'GET', 
        path: '/endereco/cliente/:clienteId/padrao', 
        description: 'Busca o endereço padrão de um cliente' 
      },
      { 
        method: 'POST', 
        path: '/endereco', 
        description: 'Cria um novo endereço para o usuário autenticado',
        body: {
          cep: '78998000',
          logradouro: 'Rua Exemplo',
          numero: '123',
          bairro: 'Centro',
          cidade: 'Vilhena',
          estado: 'RO',
          complemento: 'Apto 101',
          padrao: 1
        },
        response: {
          sucesso: true,
          mensagem: 'Endereço criado com sucesso!',
          id: 1
        }
      },
      { 
        method: 'POST', 
        path: '/endereco/:id/padrao', 
        description: 'Define um endereço como padrão',
        response: {
          sucesso: true,
          mensagem: 'Endereço definido como padrão'
        }
      },
      { 
        method: 'PUT', 
        path: '/endereco/:id', 
        description: 'Atualiza completamente um endereço',
        body: {
          cep: '78998000',
          logradouro: 'Rua Nova',
          numero: '456',
          bairro: 'Centro',
          cidade: 'Vilhena',
          estado: 'RO',
          complemento: 'Sala 2'
        },
        response: {
          sucesso: true,
          mensagem: 'Endereço atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/endereco/:id', 
        description: 'Atualiza parcialmente um endereço',
        body: {
          logradouro: 'Rua Nova',
          numero: '456'
        },
        response: {
          sucesso: true,
          mensagem: 'Endereço atualizado com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/endereco/:id', 
        description: 'Deleta um endereço (apenas do próprio usuário)' 
      },
      
      // Comentários
      { 
        method: 'POST', 
        path: '/comentarios', 
        description: 'Cria um novo comentário',
        body: {
          produto_idproduto: 1,
          usuario_id: 1,
          comentario: 'Ótimo produto!',
          avaliacao: 5
        },
        response: {
          mensagem: 'Comentário criado com sucesso!'
        }
      },
      { 
        method: 'PUT', 
        path: '/comentarios/:id', 
        description: 'Atualiza completamente um comentário',
        body: {
          comentario: 'Novo comentário atualizado',
          avaliacao: 4
        },
        response: {
          mensagem: 'Comentário atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/comentarios/:id', 
        description: 'Atualiza parcialmente um comentário',
        body: {
          avaliacao: 5
        },
        response: {
          mensagem: 'Comentário atualizado com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/comentarios/:id', 
        description: 'Deleta um comentário' 
      },
      
      // Suporte
      { 
        method: 'POST', 
        path: '/suporte', 
        description: 'Cria um novo chamado de suporte',
        body: {
          titulo_suporte: 'Problema com pedido',
          email_suporte: 'cliente@email.com',
          mensagem: 'Descrição detalhada do problema...'
        },
        response: {
          mensagem: 'Chamado de suporte criado com sucesso!',
          id: 1
        }
      },
    ],

    // ---------- ROTAS ADMIN (REQUEREM TOKEN + ADMIN) ----------
    admin: [
      // Autenticação Admin
      { 
        method: 'POST', 
        path: '/registrar-admin', 
        description: 'Registra um novo usuário admin',
        body: {
          email: 'admin@email.com',
          senha: 'senha123',
          nome_admin: 'Nome do Admin',
          nivel_acesso: 1
        },
        response: {
          mensagem: 'Admin registrado com sucesso!',
          usuario: {
            id: 1,
            email: 'admin@email.com',
            nome_admin: 'Nome do Admin',
            tipo: 'admin',
            nivel_acesso: 1
          }
        }
      },
      { 
        method: 'PUT', 
        path: '/usuarios/:id/status', 
        description: 'Ativa ou desativa um usuário (1=ativo, 0=inativo)',
        body: {
          status: 1
        },
        response: {
          mensagem: 'Usuário ativado com sucesso!'
        }
      },
      { 
        method: 'GET', 
        path: '/admin/usuarios', 
        description: 'Lista todos os usuários do sistema',
        response: {
          total: 5,
          usuarios: [
            {
              idlogin: 1,
              email: 'admin@email.com',
              tipo_usuario: 'admin',
              status_usuario: 1,
              dataCadastro: '2024-01-15 14:30:00',
              nome_admin: 'Nome do Admin',
              nivel_acesso: 10
            }
          ]
        }
      },
      
      // Produtos Admin
      { 
        method: 'POST', 
        path: '/produtos', 
        description: 'Cria um novo produto',
        body: {
          nome_produto: 'Produto Teste',
          descricao: 'Descrição detalhada do produto',
          preco: 99.99,
          estoque: 50,
          categoria_idcategoria: 1,
          marca_idmarca: 1,
          fornecedor_idfornecedor: 1,
          status_produto: 'ativo'
        },
        response: {
          mensagem: 'Produto criado com sucesso!',
          id: 1
        }
      },
      { 
        method: 'PUT', 
        path: '/produtos/:id', 
        description: 'Atualiza completamente um produto',
        body: {
          nome_produto: 'Novo Nome do Produto',
          descricao: 'Nova descrição',
          preco: 149.99,
          estoque: 30,
          categoria_idcategoria: 2,
          marca_idmarca: 1,
          fornecedor_idfornecedor: 1,
          status_produto: 'ativo'
        },
        response: {
          mensagem: 'Produto atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/produtos/:id', 
        description: 'Atualiza parcialmente um produto',
        body: {
          preco: 129.99,
          estoque: 25
        },
        response: {
          mensagem: 'Produto atualizado com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/produtos/:id', 
        description: 'Deleta um produto' 
      },
      
      // Categorias Admin
      { 
        method: 'POST', 
        path: '/categoria', 
        description: 'Cria uma nova categoria',
        body: {
          nome_Categoria: 'Acessórios',
          descricao: 'Acessórios para pesca',
          status: 'ativo'
        },
        response: {
          mensagem: 'Categoria criada com sucesso!',
          id: 1
        }
      },
      { 
        method: 'PUT', 
        path: '/categoria/:id', 
        description: 'Atualiza completamente uma categoria',
        body: {
          nome_Categoria: 'Novo Nome',
          descricao: 'Nova descrição',
          status: 'ativo'
        },
        response: {
          mensagem: 'Categoria atualizada com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/categoria/:id', 
        description: 'Atualiza parcialmente uma categoria',
        body: {
          nome_Categoria: 'Nome Atualizado'
        },
        response: {
          mensagem: 'Categoria atualizada com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/categoria/:id', 
        description: 'Deleta uma categoria' 
      },
      
      // Marcas Admin
      { 
        method: 'POST', 
        path: '/marcas', 
        description: 'Cria uma nova marca',
        body: {
          nome_marca: 'Marca XYZ'
        },
        response: {
          mensagem: 'Marca criada com sucesso!',
          id: 1
        }
      },
      { 
        method: 'PUT', 
        path: '/marcas/:id', 
        description: 'Atualiza completamente uma marca',
        body: {
          nome_marca: 'Nova Marca'
        },
        response: {
          mensagem: 'Marca atualizada com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/marcas/:id', 
        description: 'Atualiza parcialmente uma marca',
        body: {
          nome_marca: 'Marca Atualizada'
        },
        response: {
          mensagem: 'Marca atualizada com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/marcas/:id', 
        description: 'Deleta uma marca' 
      },
      
      // Fornecedores Admin
      { 
        method: 'POST', 
        path: '/fornecedores', 
        description: 'Cria um novo fornecedor',
        body: {
          nome_fornecedor: 'Fornecedor ABC',
          cnpj: '12345678000199',
          telefone: '(69) 99999-9999',
          email: 'contato@fornecedor.com'
        },
        response: {
          mensagem: 'Fornecedor criado com sucesso!',
          id: 1
        }
      },
      { 
        method: 'PUT', 
        path: '/fornecedores/:id', 
        description: 'Atualiza completamente um fornecedor',
        body: {
          nome_fornecedor: 'Novo Fornecedor',
          cnpj: '98765432000188',
          telefone: '(69) 88888-8888',
          email: 'novo@fornecedor.com'
        },
        response: {
          mensagem: 'Fornecedor atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/fornecedores/:id', 
        description: 'Atualiza parcialmente um fornecedor',
        body: {
          telefone: '(69) 77777-7777'
        },
        response: {
          mensagem: 'Fornecedor atualizado com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/fornecedores/:id', 
        description: 'Deleta um fornecedor' 
      },
      
      // Frete Admin
      { 
        method: 'POST', 
        path: '/frete', 
        description: 'Cria uma nova opção de frete',
        body: {
          tipo_frete: 'EXPRESSO',
          valor_frete: 30.00,
          prazo_entrega: 3,
          ativo: 1
        },
        response: {
          sucesso: true,
          mensagem: 'Frete criado com sucesso!',
          id: 1
        }
      },
      { 
        method: 'PUT', 
        path: '/frete/:id', 
        description: 'Atualiza completamente um frete',
        body: {
          tipo_frete: 'NORMAL',
          valor_frete: 20.00,
          prazo_entrega: 5,
          ativo: 1
        },
        response: {
          sucesso: true,
          mensagem: 'Frete atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/frete/:id', 
        description: 'Atualiza parcialmente um frete',
        body: {
          valor_frete: 25.00,
          prazo_entrega: 4
        },
        response: {
          sucesso: true,
          mensagem: 'Frete atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/frete/:id/toggle-status', 
        description: 'Ativa ou desativa uma opção de frete',
        body: {
          ativo: 1
        },
        response: {
          sucesso: true,
          mensagem: 'Frete ativado com sucesso'
        }
      },
      { 
        method: 'DELETE', 
        path: '/frete/:id', 
        description: 'Deleta uma opção de frete' 
      },
      
      // Pedidos Admin
      { 
        method: 'GET', 
        path: '/pedidos', 
        description: 'Lista todos os pedidos com filtros (status, data, valor, etc.)' 
      },
      { 
        method: 'GET', 
        path: '/pedidos/status/:status', 
        description: 'Lista pedidos por status específico' 
      },
      { 
        method: 'GET', 
        path: '/pedidos/periodo', 
        description: 'Lista pedidos em um período de datas' 
      },
      { 
        method: 'GET', 
        path: '/pedidos/cliente/:id', 
        description: 'Lista pedidos de um cliente específico' 
      },
      { 
        method: 'GET', 
        path: '/pedidos/resumo', 
        description: 'Retorna um resumo estatístico dos pedidos' 
      },
      { 
        method: 'PUT', 
        path: '/pedidos/:id', 
        description: 'Atualiza completamente um pedido',
        body: {
          Frete_idFrete: 2,
          Endereco_idEndereco: 2,
          status_pedido: 'Enviado',
          produtos: [
            { produto_id: 1, quantidade: 3 }
          ]
        },
        response: {
          sucesso: true,
          mensagem: 'Pedido atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/pedidos/:id', 
        description: 'Atualiza o status de um pedido',
        body: {
          status_pedido: 'Enviado'
        },
        response: {
          sucesso: true,
          mensagem: 'Status do pedido atualizado com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/pedidos/:id', 
        description: 'Cancela um pedido (status Cancelado)' 
      },
      
      // Clientes Admin
      { 
        method: 'GET', 
        path: '/clientes', 
        description: 'Lista todos os clientes' 
      },
      { 
        method: 'GET', 
        path: '/clientes/filtro', 
        description: 'Lista clientes com filtros (nome, cpf, email)' 
      },
      { 
        method: 'POST', 
        path: '/clientes', 
        description: 'Cria um novo cliente',
        body: {
          nome_cliente: 'Novo Cliente',
          cpf_cliente: '12345678900',
          telefone_cliente: '(69) 99999-9999',
          data_nascimento: '1990-01-01',
          usuarios_login_idlogin: 2
        },
        response: {
          mensagem: 'Cliente criado com sucesso!',
          id: 1
        }
      },
      { 
        method: 'DELETE', 
        path: '/clientes/:id', 
        description: 'Deleta um cliente' 
      },
      
      // Suporte Admin
      { 
        method: 'PUT', 
        path: '/suporte/:id', 
        description: 'Atualiza completamente um chamado de suporte',
        body: {
          titulo_suporte: 'Problema Resolvido',
          email_suporte: 'cliente@email.com',
          mensagem: 'Problema foi resolvido com sucesso',
          status: 'Resolvido'
        },
        response: {
          mensagem: 'Chamado de suporte atualizado com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/suporte/:id', 
        description: 'Atualiza parcialmente um chamado de suporte',
        body: {
          status: 'Em andamento'
        },
        response: {
          mensagem: 'Chamado de suporte atualizado com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/suporte/:id', 
        description: 'Deleta um chamado de suporte' 
      },
      
      // Contas Admin
      { 
        method: 'GET', 
        path: '/contas', 
        description: 'Lista todas as contas de usuários' 
      },
      { 
        method: 'POST', 
        path: '/contas', 
        description: 'Cria uma nova conta de usuário',
        body: {
          login_conta: 'usuario_novo',
          senha_conta: 'senha123'
        },
        response: {
          mensagem: 'Conta criada com sucesso!',
          id: 1
        }
      },
      { 
        method: 'PUT', 
        path: '/contas/:id', 
        description: 'Atualiza completamente uma conta',
        body: {
          login_conta: 'usuario_atualizado',
          senha_conta: 'nova_senha123'
        },
        response: {
          mensagem: 'Conta atualizada com sucesso!'
        }
      },
      { 
        method: 'PATCH', 
        path: '/contas/:id', 
        description: 'Atualiza parcialmente uma conta',
        body: {
          login_conta: 'usuario_novo_login'
        },
        response: {
          mensagem: 'Conta atualizada com sucesso!'
        }
      },
      { 
        method: 'DELETE', 
        path: '/contas/:id', 
        description: 'Deleta uma conta' 
      },
    ]
  };

  // ==================== FUNÇÕES AUXILIARES ====================
  
  const getMethodColor = (method) => {
    const colors = {
      'GET': '#61affe',
      'POST': '#49cc90',
      'PUT': '#fca130',
      'PATCH': '#50e3c2',
      'DELETE': '#f93e3e',
      'OPTIONS': '#0d5aa7'
    };
    return colors[method] || '#6c757d';
  };

  const getTabLabel = (tab) => {
    const labels = {
      publicas: '🌐 Públicas',
      protegidas: '🔒 Protegidas',
      admin: '🛡️ Admin'
    };
    return labels[tab] || tab;
  };

  const getTabDescription = (tab) => {
    const descriptions = {
      publicas: 'Rotas que não requerem autenticação. Acessíveis por qualquer usuário.',
      protegidas: 'Rotas que requerem token JWT válido. Para clientes logados.',
      admin: 'Rotas que requerem privilégios de administrador (tipo_usuario = "admin").'
    };
    return descriptions[tab] || '';
  };

  const getTabIcon = (tab) => {
    const icons = {
      publicas: '🌐',
      protegidas: '🔒',
      admin: '🛡️'
    };
    return icons[tab] || '📋';
  };

  const hasBody = (item) => {
    return item.body && Object.keys(item.body).length > 0;
  };

  const hasResponse = (item) => {
    return item.response && Object.keys(item.response).length > 0;
  };

  const isMethodWithBody = (method) => {
    return ['POST', 'PUT', 'PATCH'].includes(method);
  };

  // ==================== FILTRO E RENDERIZAÇÃO ====================
  
  const filteredEndpoints = endpoints[activeTab].filter(item =>
    item.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(`http://apipescfish.dev.vilhena.ifro.edu.br${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = (index) => {
    setExpandedEndpoint(expandedEndpoint === index ? null : index);
  };

  // ==================== CONTAGEM POR MÉTODO ====================
  
  const getMethodCount = (tab, method) => {
    return endpoints[tab].filter(item => item.method === method).length;
  };

  // ==================== RENDER ====================
  
  return (
    <div className={styles.container}>
      <Head>
        <title>API PescFish - Documentação Completa</title>
        <meta name="description" content="Documentação completa da API PescFish com todos os endpoints" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>🐟 PescFish API</h1>
          <div className={styles.headerInfo}>
            <span className={styles.version}>v1.0.0</span>
            <span className={styles.badge}>JWT Auth</span>
            <span className={styles.badge}>MySQL</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* ===== HERO ===== */}
        <section className={styles.hero}>
          <h2>📚 Documentação Completa da API</h2>
          <p className={styles.heroSubtitle}>
            Servidor: <code className={styles.code}>http://apipescfish.dev.vilhena.ifro.edu.br</code>
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>🔐 Autenticação JWT</span>
            <span className={styles.heroBadge}>📦 Express.js</span>
            <span className={styles.heroBadge}>🐬 MySQL</span>
            <span className={styles.heroBadge}>⚡ RESTful</span>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{endpoints.publicas.length}</span>
              <span className={styles.statLabel}>Públicas</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{endpoints.protegidas.length}</span>
              <span className={styles.statLabel}>Protegidas</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{endpoints.admin.length}</span>
              <span className={styles.statLabel}>Admin</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>
                {endpoints.publicas.length + endpoints.protegidas.length + endpoints.admin.length}
              </span>
              <span className={styles.statLabel}>Total</span>
            </div>
          </div>
        </section>

        {/* ===== SEARCH ===== */}
        <section className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar endpoints por nome, caminho ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className={styles.clearSearch}
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className={styles.searchResult}>
              {filteredEndpoints.length} resultado{filteredEndpoints.length !== 1 ? 's' : ''} encontrado{filteredEndpoints.length !== 1 ? 's' : ''}
            </p>
          )}
        </section>

        {/* ===== TABS ===== */}
        <section className={styles.tabsSection}>
          <div className={styles.tabs}>
            {Object.keys(endpoints).map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className={styles.tabIcon}>{getTabIcon(tab)}</span>
                {getTabLabel(tab)}
                <span className={styles.tabCount}>{endpoints[tab].length}</span>
              </button>
            ))}
          </div>
          <p className={styles.tabDescription}>{getTabDescription(activeTab)}</p>
          
          {/* Métodos disponíveis na aba */}
          <div className={styles.methodFilters}>
            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(method => {
              const count = getMethodCount(activeTab, method);
              return count > 0 && (
                <span key={method} className={styles.methodFilter}>
                  <span className={styles.methodDot} style={{ backgroundColor: getMethodColor(method) }}></span>
                  {method}: {count}
                </span>
              );
            })}
          </div>
        </section>

        {/* ===== ENDPOINTS ===== */}
        <section className={styles.endpointsSection}>
          {filteredEndpoints.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <p>Nenhum endpoint encontrado para <strong>"{searchTerm}"</strong></p>
              <p className={styles.emptyHint}>Tente buscar por outro termo ou remova o filtro</p>
            </div>
          ) : (
            <div className={styles.endpointsList}>
              {filteredEndpoints.map((item, index) => (
                <div key={index} className={styles.endpointCard}>
                  <div className={styles.endpointHeader}>
                    <span
                      className={styles.method}
                      style={{ backgroundColor: getMethodColor(item.method) }}
                    >
                      {item.method}
                    </span>
                    <span className={styles.path}>{item.path}</span>
                    <div className={styles.endpointActions}>
                      {isMethodWithBody(item.method) && hasBody(item) && (
                        <button
                          className={styles.expandButton}
                          onClick={() => toggleExpand(index)}
                          title="Ver JSON de exemplo"
                        >
                          {expandedEndpoint === index ? '📕' : '📘'}
                        </button>
                      )}
                      <button
                        className={styles.copyButton}
                        onClick={() => copyToClipboard(item.path)}
                        title="Copiar caminho completo"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                  <p className={styles.endpointDescription}>{item.description}</p>
                  
                  {/* Corpo da requisição e resposta (expansível) */}
                  {expandedEndpoint === index && (
                    <div className={styles.endpointDetails}>
                      {isMethodWithBody(item.method) && hasBody(item) && (
                        <div className={styles.detailBlock}>
                          <div className={styles.detailHeader}>
                            <span className={`${styles.detailBadge} ${styles.requestBadge}`}>📤 Request Body</span>
                          </div>
                          <pre className={styles.jsonBlock}>
                            {JSON.stringify(item.body, null, 2)}
                          </pre>
                          <button
                            className={styles.copyJsonButton}
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(item.body, null, 2));
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                          >
                            📋 Copiar JSON
                          </button>
                        </div>
                      )}
                      
                      {hasResponse(item) && (
                        <div className={styles.detailBlock}>
                          <div className={styles.detailHeader}>
                            <span className={`${styles.detailBadge} ${styles.responseBadge}`}>📥 Response (Exemplo)</span>
                          </div>
                          <pre className={styles.jsonBlock}>
                            {JSON.stringify(item.response, null, 2)}
                          </pre>
                          <button
                            className={styles.copyJsonButton}
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(item.response, null, 2));
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                          >
                            📋 Copiar JSON
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {copied && (
            <div className={styles.copyNotification}>
              ✅ Copiado para a área de transferência!
            </div>
          )}
        </section>

        {/* ===== AUTENTICAÇÃO ===== */}
        <section className={styles.authSection}>
          <h3>🔐 Como usar a Autenticação</h3>
          <div className={styles.authInfo}>
            <p>Para acessar as rotas <strong>protegidas</strong> e <strong>admin</strong>, você precisa incluir o token JWT no cabeçalho da requisição:</p>
            <div className={styles.codeBlock}>
              <code>Authorization: Bearer &lt;seu_token_jwt&gt;</code>
            </div>
            
            <div className={styles.authSteps}>
              <div className={styles.authStep}>
                <span className={styles.authStepNumber}>1</span>
                <div>
                  <strong>Faça login</strong>
                  <p>POST /login com email e senha</p>
                </div>
              </div>
              <div className={styles.authStep}>
                <span className={styles.authStepNumber}>2</span>
                <div>
                  <strong>Receba o token</strong>
                  <p>A resposta incluirá um token JWT</p>
                </div>
              </div>
              <div className={styles.authStep}>
                <span className={styles.authStepNumber}>3</span>
                <div>
                  <strong>Use o token</strong>
                  <p>Inclua no header Authorization em todas as requisições</p>
                </div>
              </div>
            </div>

            <div className={styles.authTips}>
              <div className={styles.authTip}>
                <span className={styles.authTipIcon}>⏰</span>
                <span>Token expira em <strong>24 horas</strong></span>
              </div>
              <div className={styles.authTip}>
                <span className={styles.authTipIcon}>🔑</span>
                <span>Use <strong>/login</strong> para obter um novo token</span>
              </div>
              <div className={styles.authTip}>
                <span className={styles.authTipIcon}>👤</span>
                <span>Admin requer <strong>tipo_usuario = "admin"</strong></span>
              </div>
              <div className={styles.authTip}>
                <span className={styles.authTipIcon}>🔄</span>
                <span>Token inválido ou expirado retorna <strong>401</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATUS CODES ===== */}
        <section className={styles.statusSection}>
          <h3>📊 Códigos de Status</h3>
          <div className={styles.statusGrid}>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusSuccess}`}>200</span>
              <span className={styles.statusLabel}>OK - Sucesso</span>
            </div>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusSuccess}`}>201</span>
              <span className={styles.statusLabel}>Created - Criado</span>
            </div>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusError}`}>400</span>
              <span className={styles.statusLabel}>Bad Request - Dados inválidos</span>
            </div>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusError}`}>401</span>
              <span className={styles.statusLabel}>Unauthorized - Não autenticado</span>
            </div>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusError}`}>403</span>
              <span className={styles.statusLabel}>Forbidden - Acesso negado</span>
            </div>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusError}`}>404</span>
              <span className={styles.statusLabel}>Not Found - Não encontrado</span>
            </div>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusError}`}>409</span>
              <span className={styles.statusLabel}>Conflict - Conflito (ex: estoque)</span>
            </div>
            <div className={styles.statusItem}>
              <span className={`${styles.statusCode} ${styles.statusError}`}>500</span>
              <span className={styles.statusLabel}>Server Error - Erro interno</span>
            </div>
          </div>
        </section>

        {/* ===== EXEMPLO ===== */}
        <section className={styles.exampleSection}>
          <h3>📖 Exemplo de Uso</h3>
          <div className={styles.exampleBlock}>
            <div className={styles.exampleStep}>
              <p><strong>1. Fazer login:</strong></p>
              <div className={styles.codeBlock}>
                <code>
                  POST /login<br />
                  {`{\n  "email": "teste@pescfish.com",\n  "senha": "123456"\n}`}
                </code>
              </div>
            </div>
            
            <div className={styles.exampleStep}>
              <p><strong>2. Resposta (token):</strong></p>
              <div className={styles.codeBlock}>
                <code>
                  {`{\n  "mensagem": "Login realizado com sucesso!",\n  "token": "eyJhbGciOiJIUzI1NiIs...",\n  "usuario": {\n    "id": 1,\n    "email": "teste@pescfish.com",\n    "tipo": "admin",\n    "nivel_acesso": 10\n  }\n}`}
                </code>
              </div>
            </div>

            <div className={styles.exampleStep}>
              <p><strong>3. Usar token em uma rota protegida:</strong></p>
              <div className={styles.codeBlock}>
                <code>
                  GET /me<br />
                  Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
                </code>
              </div>
            </div>

            <div className={styles.exampleStep}>
              <p><strong>4. Criar um pedido:</strong></p>
              <div className={styles.codeBlock}>
                <code>
                  POST /pedidos<br />
                  Header: Authorization: Bearer &lt;token&gt;<br />
                  {`{\n  "Frete_idFrete": 1,\n  "Endereco_idEndereco": 1,\n  "produtos": [\n    { "produto_id": 1, "quantidade": 2 }\n  ]\n}`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DICAS ===== */}
        <section className={styles.tipsSection}>
          <h3>💡 Dicas Rápidas</h3>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>🚀</span>
              <h4>Comece por /login</h4>
              <p>Obtenha seu token JWT primeiro para acessar as rotas protegidas</p>
            </div>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>🔍</span>
              <h4>Use filtros</h4>
              <p>Muitas rotas GET aceitam query params para filtrar resultados</p>
            </div>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>📦</span>
              <h4>PATCH para updates parciais</h4>
              <p>Use PATCH para atualizar apenas campos específicos</p>
            </div>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>🛡️</span>
              <h4>Verifique permissões</h4>
              <p>Rotas admin requerem tipo_usuario = "admin"</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>🐟 PescFish API - Documentação Completa v1.0.0</p>
          <p>Desenvolvido com ❤️ para Vilhena-RO</p>
          <p className={styles.footerSmall}>© 2024 PescFish - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}