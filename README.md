# 🧪 Dashboard de Cripto em Tempo Real

![Status](https://img.shields.io/badge/status-concluído-brightgreen)

Este projeto é uma aplicação fullstack simples construída para demonstrar a comunicação entre múltiplos serviços desacoplados, seguindo uma arquitetura modular.

> **Fluxo da Arquitetura:**
>
> **Worker (Node.js)** → **Redis** → **API (Python/Flask)** → **Frontend (React/Next.js)**

---

## 📋 Tabela de Conteúdos

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
- [Como Executar o Sistema](#-como-executar-o-sistema)
- [Autor](#-autor)

---

## 🚀 Sobre o Projeto

O objetivo foi construir um sistema que simula um fluxo de dados em tempo real, focando na comunicação assíncrona entre processos e na organização do código em diferentes tecnologias.

### Principais Funcionalidades

- **Worker (Node.js):** Gera dados simulados do preço de uma moeda a cada 5 segundos.
- **Redis:** Atua como um cache/broker de mensagens, armazenando os dados mais recentes.
- **API (Python):** Expõe um endpoint RESTful que lê os dados do Redis e os serve em formato JSON.
- **Frontend (Next.js):** Consome a API a cada 5 segundos e exibe os dados em um dashboard dinâmico e reativo.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) (com React & TypeScript), [Tailwind CSS](https://tailwindcss.com/).
- **API:** [Python](https://www.python.org/) com o micro-framework [Flask](https://flask.palletsprojects.com/).
- **Worker:** [Node.js](https://nodejs.org/en).
- **Cache/Broker:** [Redis](https://redis.io/).
- **Gerenciador de Processos:** [PM2](https://pm2.keymetrics.io/).

---

## 📁 Estrutura de Pastas

O projeto está organizado em uma estrutura de monorepo, com cada serviço em sua própria pasta:

```
/
├── api/          # Contém a API em Python/Flask
├── frontend/     # Contém a aplicação Frontend em Next.js
├── worker/       # Contém o script Worker em Node.js
├── .gitignore    # Arquivo para ignorar arquivos e pastas no Git
└── README.md     # Documentação do projeto
```

---

## 🔧 Pré-requisitos e Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- ✅ [Node.js](https://nodejs.org/en) (v18 ou superior)
- ✅ [Python](https://www.python.org/downloads/) (v3.10 ou superior) e `pip`
- ✅ [Redis](https://redis.io/docs/install/install-redis/)
- ✅ [PM2](https://pm2.keymetrics.io/) (instale globalmente com: `npm install pm2 -g`)

### Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/WilliamWunsch-s/test-fullstack.git](https://github.com/WilliamWunsch-s/test-fullstack.git)
    cd test-fullstack
    ```

2.  **Instale as dependências de cada serviço:**

    ```bash
    # Instalar dependências do Frontend
    cd frontend && npm install && cd ..

    # Instalar dependências do Worker
    cd worker && npm install && cd ..

    # Instalar dependências da API (com ambiente virtual)
    cd api
    python -m venv venv
    # Ative o ambiente virtual:
    # No macOS/Linux: source venv/bin/activate
    # No Windows: .\\venv\\Scripts\\activate
    pip install -r requirements.txt
    cd ..
    ```

---

## ▶️ Como Executar o Sistema

Para rodar a aplicação completa, você precisará de **3 terminais** para os componentes principais, mas primeiro, garanta que a dependência do Redis esteja ativa.

> ❗ **Importante:** Antes de iniciar os componentes, **certifique-se de que o serviço do Redis esteja em execução** na sua máquina.
>
> - _Comando comum para iniciar o Redis localmente: `redis-server`_

Com o Redis rodando, siga os passos abaixo:

**1. Terminal 1: Inicie o Worker (Node.js)**

Navegue até a pasta do worker e use o PM2 para iniciá-lo em segundo plano.

```bash
cd worker
pm2 start worker.js --name btc-worker
pm2 logs btc-worker # Comando opcional para acompanhar os logs
```

**2. Terminal 2: Inicie a API (Python)**

Navegue até a pasta da API, ative o ambiente virtual (se não estiver ativo) e inicie o servidor Flask.

```bash
cd api
# source venv/bin/activate ou .\\venv\\Scripts\\activate
flask run
```

A API estará disponível em `http://127.0.0.1:5000`.

**3. Terminal 3: Inicie o Frontend (Next.js)**

Finalmente, navegue até a pasta do frontend e inicie o servidor de desenvolvimento.

```bash
cd frontend
npm run dev
```

A aplicação abrirá no seu navegador em `http://localhost:3000`.

Pronto! Agora você deve ver o dashboard funcionando e atualizando a cada 5 segundos.

---

## ✨ Autor

**William Wunsch-s**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/william-wunsch/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/WilliamWunsch-s)
