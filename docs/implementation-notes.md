# Project Flora — Notas de Implementação

## Datas

- **24 de novembro de 2026** — Fase 2 (desenvolvimento visual)
- **24 de novembro de 2026** — Fase 3 (interações e revelação da carta)

---

## Contexto inicial (Fase 2)

O repositório `project-flora` existia apenas com `.git` inicializado. As decisões da Fase 1 foram materializadas em ficheiros na Fase 2.

---

## Fase 3 — Interações e revelação

### Comportamento implementado

1. Botão `#btn-surpresa` ativo (rato, toque, teclado nativo via `<button>`).
2. Ao ativar: scroll até `#carta` (`smooth` ou `auto` conforme `prefers-reduced-motion`).
3. Sequência: envelope → abertura da aba (`transform: rotateX`) → revelação do papel (`opacity` + `transform`) → estado `.is-open`.
4. Anúncio único via `#carta-live` (`aria-live="polite"`): “A carta foi revelada.”
5. Reativações durante a sequência são ignoradas; depois de aberta, o botão apenas volta a posicionar a secção (sem reanimar).

### Estrutura HTML acrescentada

- `#btn-surpresa` com `aria-controls="carta-revelacao"` e `aria-expanded`
- `#carta-revelacao` no `<article class="carta">`
- `.carta__stage`, `.carta__envelope` (+ back, flap, front, seal)
- `#carta-live` (status acessível)
- Texto de `.carta__papel` **preservado**

### Classes / estados CSS

- `html.js-carta` — enhancement ativo (só se `interactions.js` inicializar)
- `.is-opening` / `.is-open` — sequência e estado final
- Tokens de envelope e motion em `:root` (`style.css`)
- Regras de animação em `animations.css`; ajustes de largura em `responsive.css`

### Lógica JavaScript (`interactions.js`)

- Progressive enhancement: sem este script, a carta permanece legível
- `prepareSealed()` aplica `js-carta` + `aria-hidden` no papel
- Timings curtos (`afterScroll` 180ms, sequência ~840ms)
- `matchMedia('(prefers-reduced-motion: reduce)')` → revelação imediata

### `main.js`

- Continua a aplicar `html.js-ready` (flag geral; a selagem depende de `js-carta`)

---

## Ficheiros do projeto

| Caminho | Função |
| ------- | ------ |
| `index.html` | 6 secções + envelope + botão ativo |
| `css/style.css` | Tokens, layout, estilos de envelope |
| `css/responsive.css` | Breakpoints mobile-first + envelope |
| `css/animations.css` | Estados de revelação + reduced-motion |
| `js/main.js` | `js-ready` |
| `js/interactions.js` | Scroll + revelação da carta |
| `docs/design-specification.md` | Especificação visual + interação Fase 3 |
| `docs/implementation-notes.md` | Este documento |

---

## Decisões técnicas (acumuladas)

1. HTML5 + CSS3 + JS vanilla; sem frameworks.
2. Mobile-first.
3. Fontes via Google Fonts (`display=swap`); self-hosting pendente.
4. **Fase 3:** selagem só com `js-carta` para não esconder o texto se o script falhar.
5. Animações com `transform` / `opacity`.
6. Texto da carta e narrativa preservados.
7. Sem sons, partículas ou bibliotecas de motion.

---

## Testes executados

### Fase 2

| Teste | Resultado |
| ----- | --------- |
| Estrutura de ficheiros e ligações | Passou |
| HTTP local 200 (HTML/CSS/SVG) | Passou |
| Texto aprovado da carta | Passou |
| 6 secções por `id` | Passou |

### Fase 3

| Teste | Tipo | Resultado |
| ----- | ---- | --------- |
| Sintaxe JavaScript (`node --check` em `main.js` e `interactions.js`) | Automatizado | Passou |
| IDs/seletores (`btn-surpresa`, `carta`, `carta-revelacao`, envelope, live region) | Automatizado | Passou |
| Botão sem `disabled` / com `aria-controls` e `aria-expanded` | Automatizado | Passou |
| Texto da carta inalterado (8 trechos-chave) | Automatizado | Passou |
| Regras `js-carta`, `is-opening`, `is-open`, `prefers-reduced-motion`, tokens | Automatizado | Passou |
| Superfície JS (`scrollIntoView`, estados, click listener) | Automatizado | Passou |
| HTTP 200 para HTML, CSS, JS e SVG | Automatizado | Passou |
| Breakpoints 320–1440 presentes | Automatizado | Passou |
| Teste visual em browser real / DevTools | Manual | Não executado nesta sessão |
| Android físico / toque | Manual | Pendente |
| Leitor de ecrã | Manual | Pendente |
| Verificação visual de `prefers-reduced-motion` no SO | Manual | Pendente |

---

## Limitações conhecidas

- Pode haver um breve instante com a carta visível antes de `interactions.js` aplicar `js-carta` (trade-off de acessibilidade sem JS).
- Fontes ainda via CDN.
- Sem publicação em GitHub Pages.
- Animações de entrada nas outras secções não foram pedidas nesta fase e não foram implementadas.

---

## Trabalho pendente

### Fase 4
- Testes responsivos e de acessibilidade em dispositivos reais (Android)
- Otimização (self-host fonts, compressão)
- Publicação GitHub Pages (apenas com autorização)
