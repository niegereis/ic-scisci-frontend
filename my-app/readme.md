# SciSci Frontend

Este é o frontend do projeto SciSci, desenvolvido em [Next.js](https://nextjs.org/) com TypeScript e TailwindCSS. Ele consome dados de uma API Strapi protegida por token.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma instância do backend Strapi rodando e acessível

---

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/repo.git
   cd ic-scisci-frontend/my-app
   ```

2. Crie o arquivo `.env.local` na raiz do projeto:

   Exemplo de conteúdo:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://seu-backend-strapi.com
   STRAPI_API_TOKEN=seu_token_de_acesso
   ```

   - `NEXT_PUBLIC_STRAPI_URL`: URL base da API Strapi (ex: https://api.seuprojeto.com)
   - `STRAPI_API_TOKEN`: Token de acesso gerado no painel do Strapi

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

---

## Rodando o Projeto em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Build para Produção

```bash
npm run build
npm start
# ou
yarn build
yarn start
```

---

## Estrutura de Pastas

- `src/app/` — Páginas e rotas do Next.js (estrutura app directory)
- `src/components/` — Componentes reutilizáveis
- `src/hooks/` — Custom hooks (ex: useFetch)
- `src/lib/` — Utilitários (ex: fetchApi para Strapi)
- `src/types/` — Tipos TypeScript globais
- `public/` — Assets públicos (imagens, ícones, etc.)

---

## Segurança

- O token do Strapi nunca é exposto no client. Todas as requisições autenticadas são feitas em Server Components ou rotas server-side.
- Não compartilhe seu `.env.local` publicamente.

---


## Dicas

- Para alterar o backend, basta atualizar as variáveis de ambiente.
- Para adicionar novas páginas, crie uma pasta dentro de `src/app/`.

---