# 🍜 OrderStack System — Japan English Delivery

Sistema de delivery fullstack para um restaurante temático japonês-americano, desenvolvido com **Java puro no backend** e **HTML/CSS/JavaScript no frontend**, com integração via HTTP local. O projeto aplica na prática estruturas de dados clássicas (Pilha e Fila) e algoritmos de ordenação (Bubble Sort e Quick Sort), além de expor uma API REST simples para comunicação entre as camadas.

---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Estruturas de Dados](#estruturas-de-dados)
- [Algoritmos de Ordenação](#algoritmos-de-ordenação)
- [API REST](#api-rest)
- [Como Executar](#como-executar)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias](#tecnologias)

---

## Sobre o Projeto

O **OrderStack System** simula o fluxo completo de um delivery: o cliente navega pelo cardápio, monta o carrinho, finaliza o pedido e a cozinha recebe a fila de preparação. Tudo isso com fins educacionais — cada estrutura de dados e algoritmo é visível e mensurável durante o uso.

O backend roda como aplicação Java em console e sobe um servidor HTTP na porta `8080`. O frontend é uma PWA (Progressive Web App) que consome essa API e oferece a interface de pedido para o cliente.

---

## Funcionalidades

**Console (Backend)**
- Cadastro de cliente
- Exibição do cardápio com ordenação por preço (Bubble Sort) ou por nome (Quick Sort)
- Adicionar itens ao carrinho (Pilha)
- Desfazer último item adicionado — Undo via `pop()`
- Visualização do carrinho com subtotais
- Finalizar pedido — enfileira na cozinha (Fila Circular)
- Processar próximo pedido da cozinha — `dequeue()`
- Dashboard de performance com tempos de ordenação, memória utilizada, pedidos processados e contador de undos
- Laboratório interativo de ordenação passo a passo

**Frontend (Web)**
- Cardápio completo com pratos, acompanhamentos, sobremesas e bebidas
- Carrinho com suporte a undo (histórico em pilha JS)
- Ordenação do cardápio por preço (Bubble Sort) ou nome (Quick Sort) com medição de tempo
- Envio do pedido para o backend via `POST /api/pedido`
- Dashboard em tempo real com gráfico de desempenho dos algoritmos (Chart.js)
- PWA com manifest e service worker

---

## Arquitetura

```
[ Frontend - HTML/JS/CSS ]
        |
        | HTTP (localhost:8080)
        |
[ Backend - Java ]
    ├── ServidorHttp  (com.sun.net.httpserver)
    ├── PedidoHandler       → POST /api/pedido
    ├── DashboardHandler    → GET  /api/dashboard
    └── PedidoEntregueHandler → GET /api/pedido-entregue
```

O backend é iniciado via `Main.java`, que sobe o servidor HTTP em thread paralela e mantém o menu de console ativo para operações da cozinha.

---

## Estruturas de Dados

### 🥞 Pilha — `PilhaCarrinho`
Implementação manual com array. Utilizada para gerenciar os itens do carrinho, permitindo operação de **undo** (desfazer) através do método `pop()`.

| Operação | Complexidade |
|----------|-------------|
| `push`   | O(1)        |
| `pop`    | O(1)        |
| Exibir   | O(n)        |

### 🔄 Fila Circular — `FilaPedidos`
Implementação manual com array circular. Utilizada para a fila da cozinha, garantindo a ordem FIFO (primeiro a entrar, primeiro a ser preparado).

| Operação  | Complexidade |
|-----------|-------------|
| `enqueue` | O(1)        |
| `dequeue` | O(1)        |

---

## Algoritmos de Ordenação

Ambos os algoritmos são implementados no backend (`Ordenacao.java`) e espelhados no frontend (`script.js`), com medição de tempo em ambos os ambientes.

| Algoritmo    | Critério    | Complexidade Média | Complexidade Pior |
|--------------|-------------|-------------------|------------------|
| Bubble Sort  | Preço (R$)  | O(n²)             | O(n²)            |
| Quick Sort   | Nome (A-Z)  | O(n log n)        | O(n²)            |

O **Laboratório de Ordenação** (opção 9 no console) permite executar cada algoritmo passo a passo, visualizando comparações, trocas e o estado do array a cada iteração.

---

## API REST

O servidor HTTP sobe na porta `8080`. Todos os endpoints retornam JSON e incluem headers CORS.

| Método | Endpoint               | Descrição                            |
|--------|------------------------|--------------------------------------|
| POST   | `/api/pedido`          | Recebe pedido do frontend e enfileira |
| GET    | `/api/dashboard`       | Retorna métricas de performance       |
| GET    | `/api/pedido-entregue` | Confirma entrega de pedido           |

**Exemplo — POST `/api/pedido`**
```json
{
  "nome": "João",
  "total": 74.00,
  "itens": [
    { "nome": "Lamen", "preco": 38.00 },
    { "nome": "Sashimi (10 un.)", "preco": 42.00 }
  ]
}
```

---

## Como Executar

### Pré-requisitos
- Java 11 ou superior
- Navegador moderno (Chrome, Firefox, Edge)

### 1. Compilar o backend

```bash
# Na raiz do projeto
javac -d out $(find backend -name "*.java")
```

### 2. Executar o backend

```bash
java -cp out backend.application.Main
```

O console será iniciado e o servidor HTTP subirá automaticamente na porta `8080`.

### 3. Abrir o frontend

Abra o arquivo `frontend/projeto_japanenglish/index.html` diretamente no navegador ou sirva com qualquer servidor estático:

```bash
# Exemplo com Python
cd frontend/projeto_japanenglish
python3 -m http.server 3000
```

Acesse `http://localhost:3000` no navegador.

> **Atenção:** o frontend se comunica com `http://localhost:8080`. O backend deve estar rodando para que os pedidos sejam enviados e o dashboard funcione corretamente.

---

## Estrutura de Pastas

```
OrderStackSystem_web/
├── backend/
│   ├── application/
│   │   └── Main.java                  # Ponto de entrada, menu console
│   ├── estrutura/
│   │   ├── FilaPedidos.java           # Fila circular (cozinha)
│   │   └── PilhaCarrinho.java         # Pilha (carrinho + undo)
│   ├── model/
│   │   ├── Cliente.java
│   │   ├── Pedido.java
│   │   └── Produto.java
│   ├── service/
│   │   ├── DashboardPerformance.java  # Métricas e tempos
│   │   └── GerenciadorCardapio.java   # Inicialização do cardápio
│   ├── util/
│   │   ├── LaboratorioOrdenacao.java  # Ordenação passo a passo
│   │   └── Ordenacao.java            # Bubble Sort e Quick Sort
│   └── web/
│       ├── DashboardHandler.java
│       ├── PedidoEntregueHandler.java
│       ├── PedidoHandler.java
│       └── ServidorHttp.java
└── frontend/
    └── projeto_japanenglish/
        ├── index.html
        ├── style.css
        ├── script.js                  # Lógica, pilha JS, ordenação, API
        ├── manifest.json              # PWA manifest
        ├── sw.js                      # Service Worker
        └── Imagens/
            ├── LOGO.png
            └── NARUTO.jpg
```

---

## Tecnologias

| Camada    | Tecnologia                                      |
|-----------|-------------------------------------------------|
| Backend   | Java 11+, `com.sun.net.httpserver` (built-in)   |
| Frontend  | HTML5, CSS3, JavaScript (ES6+)                  |
| Gráficos  | Chart.js                                        |
| PWA       | Web App Manifest + Service Worker               |
| Build     | `javac` (sem framework ou gerenciador de build) |

---

## Conceitos Aplicados

- **Pilha (Stack)** — carrinho de compras com undo
- **Fila Circular (Queue)** — fila de pedidos da cozinha
- **Bubble Sort** — ordenação por preço, O(n²)
- **Quick Sort** — ordenação por nome, O(n log n)
- **API REST** — integração frontend/backend via HTTP + JSON
- **PWA** — Progressive Web App com service worker
- **Dashboard de performance** — comparação de algoritmos em tempo real
