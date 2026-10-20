# Registro de decisões

Cada decisão registra o contexto, a escolha e o motivo. Alterações em decisões aprovadas devem ser discutidas antes de implementadas.

## D1 — Renderização estática com Server Components

A homepage é gerada estaticamente e composta por Server Components. Apenas componentes com estado ou APIs do navegador (carrosséis, painel de reserva) são Client Components.

**Motivo:** o conteúdo muda raramente; a página estática é servida pela CDN, oferece o melhor tempo de carregamento e elimina processamento por requisição, reduzindo a superfície de ataque.

## D2 — Conteúdo em módulos TypeScript, sem CMS

Pratos, categorias, sugestões da chef e horários vivem em `src/content/`, tipados por `src/types/content.ts`. Testes em `src/content/content.test.ts` garantem a integridade das referências.

**Motivo:** custo zero, versionamento no Git e validação pelo compilador. Um CMS só será considerado se a equipe do restaurante precisar editar conteúdo sem desenvolvedor.

## D3 — Reservas pelo WhatsApp, sem backend

O canal oficial de reservas é o WhatsApp. O site monta a mensagem no navegador (`src/lib/reservation.ts`) e abre o link `wa.me` com o texto preenchido. Nenhum dado passa por servidor próprio.

- A URL usa base fixa e número validado, então o conteúdo digitado nunca altera o destino.
- O texto é codificado com `encodeURIComponent` (espaço vira `%20`). `URLSearchParams` foi evitado porque codifica espaço como `+`.
- O botão de reserva será sempre um link real; o painel guiado é aprimoramento progressivo.

## D4 — Content Security Policy sem nonce

A CSP é definida em `next.config.ts` com `'unsafe-inline'` em `script-src` e `style-src`.

**Motivo:** a CSP com nonce exige renderização dinâmica de todas as páginas, o que anula a geração estática (D1). O risco é mitigado porque o site não renderiza HTML de usuários, não carrega scripts de terceiros e restringe todas as origens a `'self'`.

**Revisão prevista:** na auditoria de lançamento, avaliar o suporte experimental a SRI (hash) do Next.js, que permitiria remover `'unsafe-inline'` de `script-src` mantendo a geração estática.

## D5 — Paleta extraída do PDF da marca

Valores obtidos por amostragem das páginas rasterizadas do PDF da identidade (aproximação de ±1 por canal), consistentes entre a página da paleta e as aplicações do logotipo.

| Token | Hex |
|---|---|
| `verde-profundo` | `#003122` |
| `marrom-terroso` | `#84431D` |
| `laranja-quente` | `#F69719` |
| `vermelho-telha` | `#DA4324` |
| `creme` | `#FAE8DC` |

**Pendente:** confirmar os valores oficiais com a agência. A página do logotipo sobre marrom usa `#854D1E`.

### Contraste (WCAG 2.2)

| Combinação | Razão | Uso |
|---|---|---|
| creme ↔ verde | 12,06 | Qualquer texto |
| laranja ↔ verde | 6,40 | Qualquer texto; botão primário laranja com texto verde |
| creme ↔ marrom | 6,30 | Qualquer texto |
| creme ↔ telha | 3,67 | Somente texto grande e elementos gráficos |
| laranja ↔ marrom | 3,34 | Somente texto grande e elementos gráficos |
| verde ↔ telha | 3,29 | Somente texto grande e elementos gráficos |
| laranja ↔ creme | 1,88 | Nunca para texto; apenas decorativo |

### Tokens semânticos

Os componentes usam `surface`, `ink`, `accent` e `focus`, que mudam de valor conforme o atributo `data-surface` da seção (`verde`, `marrom` ou o padrão creme). Contrato:

- `ink` sobre `surface` atende 4,5:1 em todas as superfícies.
- `accent` atende 3:1 em todas as superfícies e é reservado a gráficos e texto grande (traços, ícones decorativos).
- `emphasis` atende 4,5:1 em todas as superfícies e é usado em texto destacado de qualquer tamanho: marrom sobre creme (6,30), laranja sobre verde (6,40), creme sobre marrom (6,30).
- `focus` atende 3:1 contra a superfície em todos os casos.

## D6 — Linguagem visual de linhas e curvas

Aprovada: bordas e contornos fluidos, nada quadrado. Transições em onda entre seções, molduras orgânicas nas fotografias (`mask-image` com SVG), um fio contínuo que atravessa a página, botões em pílula, cards com cantos assimétricos e ilustrações apenas em traço.

Regras de equilíbrio: curvas nas bordas, texto com alinhamento firme; uma curva protagonista por tela; movimento como revelação, nunca em loop; mesma espessura de traço em todo o sistema, derivada da arara oficial.

### Implementação técnica das curvas (Etapa 1)

Validada em Chromium antes da implementação:

- **Traço uniforme:** todo desenho em linha usa a classe `traco-marca` (`vector-effect: non-scaling-stroke` + `--stroke-traco`). Assim, o traço mantém a mesma espessura mesmo em SVGs esticados com `preserveAspectRatio="none"`.
- **Sem tracejado animado em traço não escalável:** a combinação de `non-scaling-stroke` com `pathLength`/`stroke-dasharray` gerou repetições do tracejado no teste. Por isso:
  - o arco de destaque das molduras é um subcaminho aberto (`accentArc`), não um tracejado do contorno;
  - a revelação do fio do território anima `clip-path: inset()` em vez de `stroke-dashoffset`.
- **Revelação por rolagem sem JavaScript:** `animation-timeline: view()`, aplicada somente com `prefers-reduced-motion: no-preference` e dentro de `@supports`. Sem suporte ou com redução de movimento, o traço aparece completo.
- **Uma geometria, dois usos:** cada forma orgânica (`src/lib/organic-shapes.ts`) gera a máscara da fotografia (SVG em data URI) e o arco de destaque, garantindo que ambos coincidam.
- **Ondas:** `WaveDivider` é um bloco entre duas seções; o fundo é a superfície de origem e o preenchimento do caminho é a superfície de destino.

### Revisão visual (19/10/2026)

Cores, formas, transições e linhas aprovadas após revisão da página `/design-system`.

Cada forma de moldura tem um papel fixo:

| Forma | Uso |
|---|---|
| `seixo` | Chef |
| `folha` | Pratos (Sugestões da Chef e cardápio) |
| `arco` | Ambiente e salão |

## D7 — Página sem indexação até o lançamento

`robots: { index: false }` no layout raiz enquanto o site estiver em construção. Será removido na etapa de lançamento, junto com a definição do domínio, `metadataBase`, sitemap e dados estruturados.

## D8 — Testes sem dependências extras

Funções puras são testadas com `node:test` usando a remoção nativa de tipos do Node 22.18+. Por isso os testes importam módulos relativos com extensão `.ts` (`allowImportingTsExtensions`) e o projeto usa `verbatimModuleSyntax`, que exige `import type` para importações apenas de tipo.

## D9 — Cardápio interativo como etapa seguinte

O cardápio interativo (`/cardapio`) será construído após a homepage, reaproveitando o modelo `Dish` e o fluxo de reserva com contexto do prato.

## D10 — Página interna `/design-system`

Catálogo vivo dos componentes para revisão. Retorna 404 quando `VERCEL_ENV === "production"` e não é indexada. Deve ser removida ou mantida fora da produção no lançamento.

## D11 — Seção 01 sem animação de entrada no carregamento

O conteúdo acima da dobra (logotipo, título, texto e foto do salão) aparece já visível, sem fade-in. Elementos com opacidade zero não contam como pintados para o LCP, então animar a entrada atrasaria a métrica principal de carregamento. A sensação de movimento fica com o fio do território, revelado na rolagem, e com as microinterações do botão.

A foto do salão usa `loading="eager"` em vez de `preload`: no celular ela fica abaixo do texto, e a documentação do Next 16 recomenda `preload` apenas quando a imagem é certamente o elemento de LCP.

## D12 — Elementos provisórios da Seção 01

- **Logotipo:** `BrandLogo` exibia o nome em texto até a chegada do logotipo; substituído pelo vetor na D22.
- **Foto do salão:** extraída da apresentação da chef (2999 × 2002 px), reduzida para 1800 px e sem metadados. Substituir pelo arquivo original.
- **`/cardapio`:** página provisória com contato pelo WhatsApp até o cardápio interativo.
- **Textos:** rascunho em `src/content/home.ts`, aguardando aprovação da chef.

## D13 — Seção 02 e carrossel acessível

- **Seção da chef** sobre creme, com a foto na moldura `seixo` à esquerda no desktop, alternando com a Seção 01 (texto à esquerda). Os nomes dos pais e o *Mestre do Sabor* ficaram de fora até a aprovação da chef.
- **Sugestões da Chef** só aparecem quando `chefPickSlugs` tem pratos; hoje a lista está vazia porque nenhum prato foi aprovado.
- **Carrossel sem biblioteca:** `scroll-snap` nativo para arrastar no toque, botões anterior/próximo, foco por teclado no trilho (setas rolam nativamente) e indicador de posição. A lógica de estado é uma função pura testada (`src/lib/carousel.ts`). Sem autoplay. Arrastar com o mouse não foi implementado: os botões, o trackpad e o teclado cobrem esse uso.
- **História do prato** com `<details>`/`<summary>` nativos: acessível e sem JavaScript.
- **Conversão no ponto de desejo:** cada card tem "Quero provar", que abre o WhatsApp citando o prato, e o bloco termina com "Já escolheu o seu? Reserve sua mesa".

## D14 — Primeiros pratos das Sugestões da Chef

Fotos enviadas em 19/10/2026 e identificadas pela equipe:

| Foto | Prato | Uso |
|---|---|---|
| `quiabada-crocante.jpg` | Quiabada crocante | Sugestões da Chef |
| `moqueca-encontro-das-aguas.jpg` | Moqueca Encontro das Águas | Sugestões da Chef |
| `amorosa.jpg` | Amorosa | Sugestões da Chef |
| `menu-degustacao-etapa.jpg` | Etapa do Menu Degustação | Reservada para a Seção 03 |

- Descrições adaptadas do cardápio com correções de grafia; preços omitidos até a decisão sobre exibi-los.
- As fotos dos pratos ficam em `public/images/pratos/` (caminho em texto), e não importadas estaticamente, porque `src/content/menu.ts` também é lido pelos testes do Node, que não importam arquivos `.jpg`. Um teste confirma que cada foto referenciada existe.
- `objectPosition` em `ImageAsset` ajusta o recorte de cada foto dentro da moldura.
- Com três pratos, todos cabem na tela do desktop; os controles do carrossel ficam invisíveis (sem deslocar o layout) quando não há o que rolar.

## D15 — Seção 03 e painel guiado de reserva

**Seção 03** sobre superfície marrom, com texto à esquerda e a foto da etapa degustação na moldura `folha`. Abaixo, os três Menus Degustação em cards verdes (superfície aninhada), sem preços até a decisão sobre exibi-los.

**Painel de reserva** (`ReservationProvider` + `ReservationTrigger`):

- Todo convite de reserva (botão principal, cards de prato, menus degustação) é um `ReservationTrigger`: um link real para o WhatsApp que, com JavaScript carregado e dentro do provider, abre o painel em vez de navegar. Sem JavaScript ou fora do provider, o link funciona normalmente (aprimoramento progressivo). Cliques com Ctrl/Cmd/Shift mantêm o comportamento padrão do link.
- `<dialog>` nativo com `showModal()`: bloqueio do fundo, Esc para fechar e foco preso ao painel sem biblioteca. Clique fora do painel também fecha. Ao abrir, o foco vai para o campo de nome.
- Cada gatilho passa uma frase de contexto (`intro`), exibida no painel e incluída na mensagem.
- Validação nativa (`required`, `min`, `max`, `maxLength`); a data mínima é calculada ao abrir o painel, não no build, porque a página é estática.
- `readReservationForm` converte o `FormData` em `ReservationRequest` e é testada; `buildReservationMessage` sanitiza e monta a mensagem.
- `window.open(url, "_blank")` seguido de `opener = null`. Passar `"noopener"` nas opções faria `window.open` sempre retornar `null`, acionando por engano o fallback de navegar na mesma aba.
- Nenhum dado passa por servidor; o envio só acontece quando o visitante toca em enviar no WhatsApp.

Comportamentos do `<dialog>` validados em Chromium: foco inicial, Esc, clique no fundo, clique interno sem fechar, bloqueio do envio vazio e abertura da nova aba.

## D16 — Seção 04: localização e horários

**Fonte dos horários:** listagem por refeição do Perfil do Google (19/10/2026). A listagem geral do Google trazia valores incoerentes (quarta 00h–17h, domingo 07h–11h, sábado até 23h) e foi descartada.

| Refeição | Segunda a sábado | Domingo |
|---|---|---|
| Almoço | 12h às 15h | 12h às 17h |
| Jantar | 18h às 22h | Fechado |

**Endereço:** Rua Dr. Celso Oliva, 287 – 13 de Julho, Aracaju – SE, 49020-090. O botão "Como chegar" usa o identificador do local no Google Maps (`?cid=`), sem chave de API, sem iframe e sem cookies de terceiros.

**Uma fonte, três usos:** `src/content/opening-hours.ts` alimenta a lista da Seção 04 (agrupada por `groupOpeningHours`), o indicador "Aberto agora" e os horários oferecidos no painel de reserva. Mais adiante, também alimentará os dados estruturados de SEO.

**Fuso do restaurante:** todos os cálculos de "agora" e "hoje" usam `America/Maceio` via `Intl.DateTimeFormat`, independentemente do fuso de quem visita o site.

**"Aberto agora"** é um Client Component que calcula o estado no navegador e se atualiza a cada minuto, porque a página é estática e qualquer valor calculado no build ficaria congelado. O espaço é reservado (`min-h`) para não deslocar o layout.

**Painel de reserva:** o campo de horário passou a ser uma lista agrupada por refeição, gerada a partir da data escolhida, em intervalos de 30 minutos até 30 minutos antes do fechamento. Para hoje, horários passados são removidos. Dias sem horários mostram um aviso. "Reservar para hoje" abre o painel já com a data de hoje.

## D17 — Seção 05, rodapé e provider global

**Seção 05 (avaliações)** sobre verde. Exibe o carrossel de `TestimonialCard` somente quando `src/content/testimonials.ts` tiver depoimentos; até lá, mostra o título e o botão "Ver avaliações no Google". Cada depoimento precisa ser real, autorizado e identificado pela origem (`google` ou `depoimento-autorizado`). Nada de API do Google nem scraping, conforme o plano (opção A).

**Rodapé (`SiteFooter`)** no layout raiz, sobre marrom: logotipo, frase do filme-conceito, botão de reserva, endereço, horários (mesma fonte da Seção 04), WhatsApp, Instagram, e-mail e navegação. Todas as páginas terminam com uma onda para o marrom, então o rodapé se encaixa sem saber qual página está acima dele.

**`ReservationProvider` no layout raiz:** o painel de reserva passa a funcionar em todas as páginas, inclusive no rodapé, no `/cardapio` e no 404.

**Links externos centralizados** em `siteConfig.links` (Maps, avaliações, Instagram, e-mail).

O ano do rodapé é calculado no build. Como o deploy acontece a cada alteração, a defasagem só ocorreria se o site ficasse um ano inteiro sem nenhum deploy.

## D18 — Avaliações selecionadas do Google

Seis avaliações de 5 estrelas, transcritas manualmente a partir de capturas do Perfil do Google enviadas pela equipe em 19/10/2026 (sem scraping e sem API).

- **Fidelidade:** apenas frases completas e visíveis nas capturas. Trechos cortados pelo "… Mais" do Google não foram completados. Quando um trecho do meio foi omitido, isso é sinalizado com "(…)". A grafia original foi mantida.
- **Privacidade:** autores identificados pelo primeiro nome e pelas iniciais do sobrenome (ex.: "Elizabeth G."). Menções a funcionários pelo nome ficaram de fora. Um teste garante o formato dos nomes.
- **Sem datas:** o Google mostra datas relativas ("há 2 semanas"), que ficariam desatualizadas em uma página estática.
- **Nota agregada:** 4,7 de 5 e "mais de 500 avaliações", conferidos em 19/10/2026 (512 avaliações). O texto usa "mais de 500" para continuar verdadeiro à medida que o número cresce. A nota precisa ser revisada periodicamente.

## D19 — Ajustes de celular e transições acolhedoras

Revisão feita no navegador com viewport de 375 × 812.

**Ajustes de responsividade**

- Seção 01: o fio do território passava por cima do texto; no celular ele começa abaixo do botão.
- Seção 04: o fio fica oculto no celular, onde encostava no título.
- Seção 03: a foto da etapa degustação, de fundo escuro, aparecia como uma mancha preta na moldura. A imagem foi ampliada (`scale-[1.35]`) para a cumbuca preencher a forma. A ampliação fazia a imagem ultrapassar a tela em 11 px (a máscara esconde o excesso visualmente, mas não o remove do layout), o que gera rolagem lateral no celular; a moldura passou a ter `overflow-hidden`, e o `body` recebeu `overflow-x-clip` como proteção geral.
- Menus Degustação: passaram a usar o mesmo carrossel das Sugestões da Chef. No celular, isso economiza cerca de 700 px de rolagem; no desktop os três cards continuam lado a lado.
- Logotipo provisório: espaçamento entre letras menor no celular.
- Painel de reserva: vira uma "bottom sheet" no celular (preso à base, cantos superiores arredondados, alça visual) e respeita a área segura do iPhone (`env(safe-area-inset-bottom)` + `viewportFit: "cover"`).

**Transições (somente CSS, sem JavaScript)**

| Classe | Efeito | Faixa da rolagem |
|---|---|---|
| `onda-chegar` | A onda sobe da base como uma maré (`scale` vertical de 0,3 a 1) | `entry 0%` → `cover 55%` |
| `traco-desenhar` | O traço laranja se desenha da esquerda para a direita | `entry 20%` → `cover 60%` |
| `surgir` | Blocos de texto sobem 2,5 rem enquanto aparecem | `entry 5%` → `cover 30%` |
| `surgir-depois` | Mesma animação, um pouco mais tarde (escalonamento) | `entry 15%` → `cover 38%` |
| `moldura-abrir` | A foto abre de 90% para 100% do tamanho enquanto aparece | `entry 0%` → `cover 35%` |
| `painel-reserva` | O painel desliza de baixo (celular) ou sobe 1,5 rem (desktop) ao abrir e ao fechar | Transição de 450 ms |

Regras:

- Tudo dentro de `prefers-reduced-motion: no-preference`; as animações de rolagem também exigem `@supports (animation-timeline: view())`. Sem suporte ou com movimento reduzido, o conteúdo aparece completo e parado.
- A Seção 01 não recebe animação de entrada (D11). A moldura dela usa `animated={false}`, porque no desktop a foto está visível no carregamento e uma animação ligada à posição a deixaria parcialmente transparente.
- A abertura do painel usa `@starting-style` e `transition-behavior: allow-discrete` para animar a entrada e a saída de um `<dialog>`, que alterna entre `display: none` e visível.

Validado em Chromium (375 × 812): onda, traço e texto partindo do estado inicial e chegando ao final com a rolagem; painel deslizando de 100% a 0; com movimento reduzido, nenhuma animação aplicada.

## D20 — Cardápio interativo

Estrutura do wireframe de 19/10/2026: um sumário com cards de foto por categoria, que leva a uma página por categoria, com cards de nome e preço que viram ao toque para mostrar a descrição.

**Rotas (todas estáticas)**

- `/cardapio`: sumário em grade de 3 colunas, inclusive no celular, como no wireframe.
- `/cardapio/[categoria]`: uma página por categoria, gerada no build por `generateStaticParams`. Com `dynamicParams = false`, qualquer categoria inexistente responde 404 sem processamento no servidor.

**Dados**

- Todo o cardápio do PDF (9 categorias) está em `src/content/menu.ts`, com grafia revisada (ex.: "mingnon" → mignon, "amouse bouche" → amuse-bouche, "Tripbo" → tribo, "carangueijo" → caranguejo, "farorita" → favorita, "aligort" → aligot, "couli" → coulis, "toffe" → toffee, "crips" → crisps).
- Preços em centavos (`amountInCents`), com opções rotuladas quando há mais de um valor (Individual/Casal; sem harmonização/com drinks/com vinho). Exibidos sem centavos quando inteiros ("R$ 94").
- `group` organiza subtítulos dentro da categoria (Cozinha Autoral/Cozinha de Origem, Cervejas, Doses…).
- `layout` por categoria: `cards` (com descrição, card que vira) ou `list` (Bebidas: lista de preços com linha pontilhada, sem verso).
- Os Menus Degustação da home passaram a ler os mesmos dados do cardápio (com "A partir de R$ …" e link para os detalhes): uma única fonte.
- Testes garantem: todo item tem preço, todo item de categoria em cards tem descrição para o verso, nenhuma categoria vazia, fotos de capa existem.

**Card que vira (`FlipCard`)**

- Frente (verde): nome, etapas (menus), preço(s) e "Toque para saber mais". Verso (marrom): descrição, subitens, história, observações, "Quero provar" (abre o painel de reserva citando o item) e "Voltar".
- Rotação 3D (`perspective`, `preserve-3d`, `backface-visibility: hidden`) de 700 ms. As duas faces ocupam a mesma célula de grid, então a altura do card é a da face mais alta e nada se desloca ao virar.
- Acessibilidade: a frente é um `<button>` com `aria-expanded`/`aria-controls`; a face escondida recebe `inert` (não focável nem lida); ao virar, o foco vai para o verso e, ao voltar, para a frente.
- Com movimento reduzido, não há rotação: as faces apenas trocam de visibilidade.

**Pendências**

- Fotos originais para as capas de Pratos Principais, Pratos Infantis, Hambúrgueres, Drinks e Bebidas (hoje com capa gráfica provisória).
- Confirmar se os preços do PDF estão atualizados.
- Revisar com a chef: "crudo de cau e Dijon" (Tartar) e a expressão "explosão de sabores" (São Gonçalo), mantidas como no PDF.

## D21 — Texto centralizado no celular e toques mais fluidos

**Alinhamento**: a pedido da equipe, títulos, textos e botões das seções ficam centralizados no celular (`text-center`) e voltam a alinhar à esquerda a partir do tablet (`md:text-left`), onde a composição em duas colunas pede um eixo firme. Isso substitui, no celular, a regra "texto com alinhamento firme" da D6. Componentes de leitura em linha (lista de horários, lista de bebidas, verso dos cards, depoimentos) continuam alinhados à esquerda.

**Toques**

- `-webkit-tap-highlight-color: transparent` remove o flash cinza/azul que o navegador desenha ao tocar em links e botões.
- `touch-action: manipulation` em elementos interativos desativa o gesto de duplo toque para zoom neles, para que o navegador não espere um segundo toque antes de responder.
- Retorno imediato ao toque: cards de categoria e frente dos cards de prato encolhem levemente enquanto pressionados (`active:scale`, 150 ms).
- Virada dos cards mais ágil: 500 ms com curva que acelera no início e desacelera no fim (`cubic-bezier(0.2, 0.8, 0.2, 1)`), em vez de 700 ms.
- Carrosséis com `overscroll-behavior-x: contain`: arrastar até o fim do carrossel não aciona o gesto de voltar página do navegador.

## D22 — Logotipo e selo vetoriais; contatos com ícones

**Origem**: as duas versões enviadas pela equipe (logotipo horizontal laranja e creme; selo circular verde) foram vetorizadas a partir das imagens, com contorno subpixel (amostragem 4×, tolerância de 0,25 px da imagem original). "Bistrô" foi retirado das duas:

- Logotipo horizontal: só arara e "Seu Sergipe". A assinatura "Casa de Cultura & Arte Gastronômica" fica em texto HTML abaixo, legível em qualquer tamanho.
- Selo: "Bistrô" removido do anel; "Seu Sergipe" foi girado sobre o centro do círculo para voltar a ficar centralizado no topo. "Arte • Poesia • Gastronomia" e as flores permanecem como no original.

Os caminhos ficam em `brand-paths.ts`, desenhados inline com `currentColor`, para trocar de cor conforme a superfície sem gerar arquivos por cor.

**Cores**: a arara usa o token `--simbolo` (laranja sobre verde e marrom; verde profundo sobre creme) e o nome usa a cor do texto (creme sobre fundos escuros). O selo do rodapé é monocromático em creme sobre marrom.

**Tamanhos**: `size="lg"` (abertura da home, com assinatura) e `size="sm"` (cabeçalhos do cardápio, sem assinatura).

**Rodapé**: WhatsApp e Instagram viram ícones em círculo de traço (48 px de área de toque), com o número ao lado do WhatsApp e a palavra "Instagram" ao lado do Instagram. No celular ficam um abaixo do outro, com os ícones alinhados numa mesma coluna; a partir do tablet ficam lado a lado. Os e-mails continuam em texto, com rótulo: restaurante (`seusergipe@gmail.com`) e contato comercial da chef (`seichelebarboza@gmail.com`, incluído a pedido da equipe).

**Pendente**: substituir pelos vetores originais da agência quando chegarem; a troca acontece apenas em `brand-paths.ts`.

## D23 — Organização do código, segurança e preparação para a Vercel

**Organização**

- O cardápio deixou de usar comentários para separar categorias: cada bloco é `inCategory("slug", [...])`, que acrescenta `categorySlug` aos pratos. O nome da categoria no código substitui o comentário, e o campo repetido saiu de 97 pratos. Os dados gerados são idênticos aos anteriores (comparação automatizada).
- Constantes e funções usadas só dentro do próprio módulo deixaram de ser exportadas (`opening-hours.ts`, `surfaces.ts`). A superfície pública de cada módulo passa a ser o que outros arquivos realmente usam.
- `SeuSergipeLogo.png` saiu do repositório: não era usado e continha "Bistrô". O original foi para `_referencias/`.

**Ambiente (`src/lib/deployment.ts`)**: uma função pura, testada, resolve a URL pública e a permissão de indexação a partir das variáveis de ambiente. A URL vem de `SITE_URL` ou, na falta dela, do domínio de produção da Vercel. A indexação exige produção **e** `SITE_INDEXING=on`. Assim um deploy de produção antes do lançamento não aparece nos buscadores por engano. Uma URL inválida, ou sem https em produção, interrompe o build em vez de publicar metadados errados.

**SEO técnico**: `metadataBase`, URLs canônicas por página, Open Graph com a foto do salão (1200 × 630, 123 KB) para a prévia de links no WhatsApp, `robots.txt` e `sitemap.xml` gerados no build.

**Ícones**: arara laranja sobre verde profundo em `icon.svg` (abas), `favicon.ico` (16, 32 e 48 px, navegadores antigos) e `apple-icon.png` (180 px, tela inicial do iPhone, sem cantos arredondados porque o iOS aplica a própria máscara). No ícone da aba, o traço da arara é engrossado para continuar legível em 16 px; no ícone de 180 px o traço fica próximo do original.

**Headers**: CSP passa a bloquear iframes (`frame-src 'none'`) e deixa de aceitar imagens `blob:`, que o site não usa. `Permissions-Policy` também nega pagamento e USB. O `'unsafe-inline'` em `script-src` permanece: os scripts inline do Next.js exigiriam nonce, o que obriga renderização dinâmica em todas as páginas e elimina a geração estática. Como o site não tem entrada de usuário renderizada no servidor, o ganho não compensa.

**Node**: `engines.node` fixado em `22.x`, para que a Vercel use a mesma versão principal do desenvolvimento em vez de subir de versão sozinha.

---

# Pendências

## Bloqueiam o design
- Wireframes
- Vetores originais da agência para o logotipo e o selo (hoje vetorizados a partir de imagem, ver D22)
- Arquivos e licença web de Tropicane e Silka (confirmar se a secundária é Silka Mono)
- Padronagens em vetor
- Valores oficiais da paleta

## Bloqueiam o conteúdo
- Confirmar o WhatsApp de reservas: (79) 98869-5326
- Instagram oficial: o rodapé usa `@seusergipe`; confirmar (o cardápio também cita `@restaurante_seusergipe`)
- E-mail público do restaurante: o rodapé usa `seusergipe@gmail.com`; confirmar
- Confirmar com a chef a publicação de `seichelebarboza@gmail.com`: o mesmo endereço é a chave Pix dela na apresentação comercial
- Autorização dos autores (ou decisão formal do restaurante) para exibir as seis avaliações no site antes do lançamento
- Revisão periódica da nota agregada do Google (hoje 4,7)
- Ano de fundação: 2015 (cardápio) ou 2023 (material da marca)
- Aprovação da chef: biografia, nomes dos pais, citação, redação sobre o *Mestre do Sabor*
- Aprovação da chef para as descrições dos pratos das Sugestões
- Mais pratos para as Sugestões (ideal de 5 a 8) e original em alta resolução da foto da Moqueca Encontro das Águas (recebida com 720 × 1280 px)
- Arquivo original da foto do salão
- Aprovação dos textos da Seção 01
- Autorização de imagem dos clientes na foto do salão e crédito do fotógrafo
- Domínio definitivo (configurar `SITE_URL` na Vercel, ver D23)
- Último horário aceito para reserva em cada refeição (adotado: 30 minutos antes do fechamento) e intervalo entre horários (adotado: 30 minutos)
- Corrigir no Perfil do Google a listagem geral de horários (quarta e domingo aparecem incoerentes)
- Número de pessoas a partir do qual a reserva é tratada como grupo grande
- Aprovação da inclusão dos Menus Degustação na Seção 03
