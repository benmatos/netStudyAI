# Quiz Generator AI

Este é um aplicativo web construído com Next.js que permite aos usuários gerar automaticamente questionários de múltipla escolha a partir de arquivos PDF. A aplicação utiliza a API Genkit do Google para analisar o conteúdo do PDF e criar as perguntas, opções e explicações.

## Funcionalidades Principais

-   **Geração de Questionários por IA:** Faça o upload de um arquivo PDF, defina o nome da disciplina e o número de questões desejadas. A IA analisará o documento e criará um questionário completo.
-   **Dashboard Interativo:** A página inicial serve como um painel, exibindo uma visão geral do seu progresso, incluindo o número de questionários criados, e uma lista de acesso rápido aos seus simulados mais recentes.
-   **Simulados Interativos:** Responda às questões geradas em uma interface limpa e focada. Receba feedback instantâneo para cada resposta, com explicações detalhadas para a alternativa correta.
-   **Armazenamento Local:** Todos os questionários gerados são salvos diretamente no seu navegador usando `localStorage`, garantindo que seus dados persistam entre as sessões sem a necessidade de um banco de dados.
-   **Design Moderno e Responsivo:** A interface foi construída com ShadCN UI e Tailwind CSS, oferecendo uma experiência de usuário moderna, agradável e totalmente responsiva.

## Tecnologias Utilizadas

-   **Framework:** [Next.js](https://nextjs.org/) (com App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes UI:** [ShadCN UI](https://ui.shadcn.com/)
-   **Inteligência Artificial:** [Google Genkit](https://firebase.google.com/docs/genkit)
-   **Ícones:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **Formulários:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente de desenvolvimento.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 20 ou superior)
-   [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
-   Uma chave de API para a API do Gemini. Você pode obter uma no [Google AI Studio](https://aistudio.google.com/app/apikey).

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_DIRETORIO>
```

### 2. Instalar as Dependências

Instale todas as dependências do projeto usando npm.

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave da API do Gemini.

```.env
GEMINI_API_KEY=SUA_CHAVE_DE_API_AQUI
```

### 4. Executar os Serviços

Você precisará de dois terminais para executar o projeto: um para o servidor de desenvolvimento do Next.js e outro para o Genkit.

-   **Terminal 1: Iniciar o servidor de desenvolvimento Next.js**

```bash
npm run dev
```

Por padrão, a aplicação estará disponível em `http://localhost:9002`.

-   **Terminal 2: Iniciar o Genkit**

O Genkit é o toolkit que executa os fluxos de IA.

```bash
npm run genkit:dev
```

Este comando inicia o Genkit e o mantém em execução para que a aplicação Next.js possa se comunicar com ele.

### 5. Usar a Aplicação

Com ambos os servidores em execução, abra seu navegador em `http://localhost:9002` para começar a usar o Quiz Generator AI.
