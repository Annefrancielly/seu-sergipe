# Seu Sergipe — Casa de Cultura & Arte Gastronômica

Website oficial do Seu Sergipe, restaurante assinado pela chef Seichele Barboza.

O site transforma os destinos do link da bio em uma jornada visual e narrativa: apresentar a casa, a chef e a cozinha, despertar o desejo de conhecer o restaurante e conduzir o visitante até a reserva pelo WhatsApp.

## Stack

- [Next.js 16](https://nextjs.org/docs) com App Router e Turbopack
- React 19 e TypeScript em modo estrito
- Tailwind CSS 4
- Deploy na Vercel

## Requisitos

- Node.js 22.18 ou superior (ver `.nvmrc`)
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
  app/                  rotas, layout raiz e estilos globais (tokens do design system)
  app/design-system/    catálogo interno dos componentes (indisponível em produção)
  assets/images/        fotografias otimizadas importadas estaticamente
  components/brand/     identidade (logotipo)
  components/graphics/  SVGs decorativos: ondas, fio do território, ícones
  components/layout/    estrutura de página (Section com superfície contextual)
  components/ui/        componentes de interface (botões, molduras orgânicas)
  config/               dados institucionais públicos (nome, assinatura, contato)
  content/              conteúdo tipado: cardápio, sugestões da chef, horários
  lib/                  funções puras (reserva, cardápio, formas orgânicas, superfícies)
  sections/             seções da homepage, uma pasta por seção
  types/                tipos de domínio compartilhados
```

Pasta prevista para as próximas etapas: `hooks/`.

Para revisar os componentes, rode `npm run dev` e acesse `http://localhost:3000/design-system`.

## Convenções

- **Server Components por padrão.** Client Components apenas onde houver estado, eventos ou APIs do navegador.
- **Uma fonte de verdade por dado.** Pratos vivem em `content/menu.ts`; as sugestões da chef são apenas uma lista de slugs que referenciam esses pratos.
- **Funções puras em `lib/`**, testadas com `node:test`, sem dependências extras.
- **Nenhum segredo no repositório.** Veja `.env.example`.
- **Documentos de referência** (PDFs da marca e da chef) ficam em `_referencias/`, ignorada pelo Git, pois contêm dados pessoais e bancários.

## Fluxo de trabalho

Cada etapa é desenvolvida em uma branch própria e integrada à `main` por pull request revisado.

## Decisões e pendências

Registradas em [`docs/decisoes.md`](docs/decisoes.md).
