# SciSci Frontend

Este repositório contém o **frontend do projeto SciSci**, desenvolvido com [Next.js](https://nextjs.org/) (App Router), TypeScript e TailwindCSS. O objetivo é oferecer uma plataforma acadêmica moderna para divulgação de projetos, publicações, equipe e artigos científicos, consumindo dados de uma API Strapi protegida por token.

---

## Funcionalidades Implementadas

- **Página Inicial Dinâmica**
  - Exibe informações institucionais do projeto (imagem, título, descrição) vindas do Strapi.
  - Lista as publicações recentes do blog, com link para ver todas.

- **Blog e Publicações**
  - Listagem de artigos de blog, cada um com imagem de capa, título, descrição e autor.
  - Página de detalhe do artigo, renderizando conteúdo em blocos (Strapi Blocks) e informações do autor.
  - Página de publicações acadêmicas, exibindo título, periódico, ano, autores e link externo.

- **Projetos Científicos**
  - Listagem de projetos cadastrados, cada um com imagem, título e link para detalhes.
  - Página de projeto detalhado, mostrando descrição, equipe envolvida (autores) e publicações relacionadas.

- **Equipe**
  - Página dedicada à equipe, exibindo membros, imagens, descrições e status acadêmico.

- **Chatbot IA**
  - Chatbot integrado via API Gemini (Google), com interface moderna e persistência local das conversas.
  - Suporte a múltiplas conversas, histórico, exclusão e navegação entre chats.

- **Navegação e Layout**
  - Navbar responsiva com links para todas as seções.
  - Footer com links institucionais e redes sociais.
  - Design responsivo e acessível, otimizado para desktop e mobile.

- **Integração Segura com Backend**
  - Todas as requisições autenticadas ao Strapi são feitas em Server Components ou rotas server-side.
  - Token de acesso nunca exposto ao client.

---

## Possibilidades de Expansão

- Adição de novos tipos de conteúdo (ex: eventos, notícias, disciplinas).
- Integração com outros sistemas acadêmicos (ex: ORCID, Google Scholar).
- Internacionalização (i18n) para múltiplos idiomas.
- Filtros avançados, busca e ordenação de publicações/projetos.
- Dashboard administrativo para estatísticas e relatórios.
- Customização do chatbot para responder sobre conteúdos do próprio projeto.

---

## Estrutura de Pastas

- `src/app/` — Páginas e rotas do Next.js (estrutura app directory)
- `src/app/components/` — Componentes reutilizáveis (Navbar, Footer, Blogs, Projects, Chat, etc)
- `src/contexts/` — Contextos globais (ex: ChatContext)
- `src/hooks/` — Custom hooks (ex: useFetch)
- `src/lib/` — Utilitários (ex: fetchApi para Strapi)
- `src/types/` — Tipos TypeScript globais
- `public/` — Assets públicos (imagens, ícones, etc.)

---

## Como rodar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/niegereis/ic-scisci-frontend.git
   cd ic-scisci-frontend/my-app
   ```

2. **Configure o ambiente:**
   Crie o arquivo `.env.local` com:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://seu-backend-strapi.com
   STRAPI_API_TOKEN=seu_token_de_acesso
   GEMINI_API_KEY=sua_chave_gemini
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Inicie o projeto:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

---

## Segurança

- O token do Strapi nunca é exposto no client.
- Não compartilhe seu `.env.local` publicamente.
- Todas as requisições protegidas são feitas no servidor.

---

## Tecnologias Utilizadas

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Strapi (API backend)
- Cloudinary (imagens remotas)
- React Icons, Framer Motion, React Markdown
- Gemini API (Google) para IA

---