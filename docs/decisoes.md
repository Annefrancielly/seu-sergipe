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

- **Logotipo:** `BrandLogo` exibe o nome em texto, marcado com `data-placeholder="logotipo-oficial-pendente"`, até a chegada do vetor sem "Bistrô". A troca acontece apenas nesse componente.
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

---

# Pendências

## Bloqueiam o design
- Wireframes
- Logotipo e selo vetoriais sem "Bistrô"
- Arquivos e licença web de Tropicane e Silka (confirmar se a secundária é Silka Mono)
- Padronagens em vetor
- Valores oficiais da paleta

## Bloqueiam o conteúdo
- Confirmar o WhatsApp de reservas: (79) 98869-5326
- Instagram oficial: `@seusergipe` ou `@restaurante_seusergipe`
- Ano de fundação: 2015 (cardápio) ou 2023 (material da marca)
- Aprovação da chef: biografia, nomes dos pais, citação, redação sobre o *Mestre do Sabor*
- Aprovação da chef para as descrições dos pratos das Sugestões
- Mais pratos para as Sugestões (ideal de 5 a 8) e original em alta resolução da foto da Moqueca Encontro das Águas (recebida com 720 × 1280 px)
- Arquivo original da foto do salão
- Aprovação dos textos da Seção 01
- Autorização de imagem dos clientes na foto do salão e crédito do fotógrafo
- Decisão sobre exibir preços no cardápio
- Domínio
- Último horário aceito para reserva em cada refeição (adotado: 30 minutos antes do fechamento) e intervalo entre horários (adotado: 30 minutos)
- Corrigir no Perfil do Google a listagem geral de horários (quarta e domingo aparecem incoerentes)
- Número de pessoas a partir do qual a reserva é tratada como grupo grande
- Aprovação da inclusão dos Menus Degustação na Seção 03
