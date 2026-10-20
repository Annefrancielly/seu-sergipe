# Seu Sergipe — Casa de Cultura & Arte Gastronômica

Website oficial do Seu Sergipe, restaurante assinado pela chef Seichele Barboza.

O site transforma os destinos do link da bio em uma jornada visual e narrativa: apresentar a casa, a chef e a cozinha, despertar o desejo de conhecer o restaurante e conduzir o visitante até a reserva pelo WhatsApp.

## Stack

- [Next.js 16](https://nextjs.org/docs) com App Router e Turbopack
- React 19 e TypeScript em modo estrito
- Tailwind CSS 4
- Deploy na Vercel

## Requisitos

- Node.js 22, versão 22.18 ou superior (ver `.nvmrc`); os testes dependem da remoção nativa de tipos do Node
- npm

## Primeiros passos

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (inclui checagem de tipos do Next) |
| `npm run start` | Serve o build de produção localmente |
| `npm run typecheck` | Gera os tipos de rota do Next e roda o `tsc` |
| `npm run lint` | ESLint com as regras de Core Web Vitals e TypeScript |
| `npm run test` | Testes das funções puras com o test runner nativo do Node |
| `npm run check` | Executa typecheck, lint e testes em sequência |

## Estrutura

```
src/
  app/                    rotas, layout raiz, estilos globais, ícones, robots e sitemap
  app/cardapio/           sumário do cardápio e páginas estáticas por categoria
  app/design-system/      catálogo interno dos componentes (indisponível em produção)
  assets/images/          fotografias importadas estaticamente
  components/brand/       logotipo e selo vetoriais
  components/graphics/    SVGs decorativos e ícones
  components/hours/       status de funcionamento em tempo real
  components/layout/      estrutura de página (Section, rodapé)
  components/menu/        cards de categoria, cards que viram, lista de bebidas
  components/reservation/ painel e gatilhos de reserva pelo WhatsApp
  components/ui/          botões, molduras orgânicas, carrossel, cards
  config/                 dados institucionais públicos e configuração de ambiente
  content/                conteúdo tipado: cardápio, chef, horários, avaliações
  lib/                    funções puras testadas (reserva, horários, cardápio, preços)
  sections/               seções da homepage, uma pasta por seção
  types/                  tipos de domínio compartilhados
public/images/pratos/     fotos de pratos e capas de categoria
```

Para revisar os componentes, rode `npm run dev` e acesse `http://localhost:3000/design-system`.

## Convenções

- **Server Components por padrão.** Client Components apenas onde houver estado, eventos ou APIs do navegador.
- **Uma fonte de verdade por dado.** Pratos vivem em `content/menu.ts`; as sugestões da chef são apenas uma lista de slugs que referenciam esses pratos.
- **Funções puras em `lib/`**, testadas com `node:test`, sem dependências extras.
- **Nenhum segredo no repositório.** As variáveis de ambiente estão documentadas em `.env.example` e nenhuma delas é secreta.
- **Documentos de referência** (PDFs da marca e da chef) ficam em `_referencias/`, ignorada pelo Git, pois contêm dados pessoais e bancários.

## Deploy na Vercel

1. Importe o repositório na Vercel. O framework é detectado automaticamente e o build roda `npm run build`.
2. Em **Project Settings → Environment Variables**, no ambiente **Production**:
   - `SITE_URL`: endereço público definitivo (ex.: `https://www.dominio.com.br`). Sem ele, o site usa o domínio `*.vercel.app` do projeto.
   - `SITE_INDEXING`: deixe vazio até o lançamento. Com `on`, libera a indexação.
3. Antes de cada merge na `main`, rode `npm run check`.

**Enquanto `SITE_INDEXING` não for `on`**, todas as páginas saem com `noindex` e o `robots.txt` bloqueia os buscadores. Deploys de preview nunca são indexados, independentemente da variável.

**Segurança.** Os headers HTTP (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy` e outros) ficam em `next.config.ts`. A rota `/design-system` responde 404 em produção.

### Checklist de lançamento

- [ ] Domínio configurado na Vercel e `SITE_URL` apontando para ele
- [ ] Pendências de conteúdo de `docs/decisoes.md` resolvidas
- [ ] `SITE_INDEXING=on` em Production e novo deploy
- [ ] Conferir `/robots.txt`, `/sitemap.xml` e a prévia do link no WhatsApp

## Fluxo de trabalho

Cada etapa é desenvolvida em uma branch própria e integrada à `main` por pull request revisado.

## Decisões e pendências

Registradas em [`docs/decisoes.md`](docs/decisoes.md).
