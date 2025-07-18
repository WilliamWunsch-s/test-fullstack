# 🧪 Dashboard de Cripto em Tempo Real

Este projeto é uma aplicação fullstack simples construída para demonstrar a comunicação entre múltiplos serviços desacoplados, seguindo uma arquitetura orientada a eventos e micro-serviços.

O fluxo de dados segue a seguinte arquitetura:

**Worker (Node.js)** → **Redis** → **API (Python/Flask)** → **Frontend (React/Next.js)**

---

## 🚀 Tecnologias Utilizadas

-   **Frontend:** [Next.js](https://nextjs.org/) (com React & TypeScript) e [Tailwind CSS](https://tailwindcss.com/) para estilização.
-   **API:** [Python](https://www.python.org/) com o micro-framework [Flask](https://flask.palletsprojects.com/).
-   **Worker:** [Node.js](https://nodejs.org/en) para geração de dados simulados.
-   **Cache/Broker:** [Redis](https://redis.io/) para atuar como um cache rápido e meio de comunicação entre o worker e a API.
-   **Gerenciador de Processos:** [PM2](https://pm2.keymetrics.io/) para manter o worker Node.js rodando em segundo plano.

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

-   [Node.js](https://nodejs.org/en) (v18 ou superior)
-   [Python](https://www.python.org/downloads/) (v3.10 ou superior) e `pip`
-   [Redis](https://redis.io/docs/install/install-redis/) (ou [Docker](https://www.docker.com/) para rodá-lo em um contêiner)
-   [PM2](https://pm2.keymetrics.io/) (para instalar, rode: `npm install pm2 -g`)

---

## ⚙️ Instalação Local

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd nome-do-projeto
    ```

2.  **Instale as dependências do Frontend:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

3.  **Instale as dependências da API:**
    ```bash
    cd api
    # Crie e ative um ambiente virtual (recomendado)
    python -m venv venv
    source venv/bin/activate  # No macOS/Linux
    # .\venv\Scripts\activate # No Windows
    
    # Instale os pacotes
    pip install -r requirements.txt
    cd ..
    ```
    
4.  **Instale as dependências do Worker:**
    ```bash
    cd worker
    npm install
    cd ..
    ```

---

## ▶️ Como Executar o Projeto

Para rodar a aplicação completa, você precisará de **4 terminais** abertos, um para cada serviço.

**1. Terminal 1: Inicie o Redis**

Se você instalou o Redis localmente, use:
```bash
redis-server
```
*Se estiver usando Docker:* `docker run -p 6379:6379 redis:alpine`

**2. Terminal 2: Inicie o Worker (Node.js)**

Navegue até a pasta do worker e use o PM2 para iniciá-lo em segundo plano.
```bash
cd worker
pm2 start worker.js --name btc-worker
pm2 logs btc-worker # Para acompanhar os logs
```

**3. Terminal 3: Inicie a API (Python)**

Navegue até a pasta da API, ative o ambiente virtual e inicie o servidor Flask.
```bash
cd api
source venv/bin/activate # ou .\venv\Scripts\activate no Windows
flask run
```
A API estará disponível em `http://127.0.0.1:5000`.

**4. Terminal 4: Inicie o Frontend (Next.js)**

Finalmente, navegue até a pasta do frontend e inicie o servidor de desenvolvimento.
```bash
cd frontend
npm run dev
```
A aplicação abrirá no seu navegador em `http://localhost:3000`.

Pronto! Agora você deve ver o dashboard funcionando e atualizando a cada 5 segundos.