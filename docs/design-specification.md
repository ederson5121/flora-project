# Project Flora — Especificação de Design

**Conceito visual:** Midnight Romance  
**Idioma:** Português de Angola (`pt-AO`)  
**Destinatária:** Flora  
**Responsável:** Ederson  
**Estado:** Decisões da Fase 1 preservadas; implementação visual na Fase 2.

---

## Conceito

Experiência editorial, romântica e minimalista. Combina elegância tipográfica, romantismo discreto e atmosfera contemporânea. Sem fotografias do casal — ilustrações SVG abstratas e composições tipográficas.

---

## Paleta de cores

| Nome            | Código  | Utilização                             |
| --------------- | ------- | -------------------------------------- |
| Midnight Blue   | `#172B46` | Secções escuras e elementos principais |
| Warm Ivory      | `#F7F1E8` | Fundo principal                        |
| Dusty Rose      | `#C99A9E` | Destaques românticos                   |
| Soft Champagne  | `#D6B77A` | Pequenos detalhes especiais            |
| Deep Charcoal   | `#292522` | Texto principal                        |
| Soft Background | `#F2EBE3` | Fundos secundários                     |

### Distribuição orientadora

- ~55% Warm Ivory  
- ~25% Midnight Blue  
- ~15% Dusty Rose  
- ~5% Soft Champagne  

Equilíbrio visual e contraste têm prioridade sobre distribuição mecânica.

---

## Tipografia

| Uso                         | Família              |
| --------------------------- | -------------------- |
| Títulos e destaques         | Cormorant Garamond   |
| Texto corrido e interface   | DM Sans              |

Hierarquia consistente: títulos expressivos; corpo legível; eyebrows em caixa alta com letter-spacing alargado.

---

## Estrutura narrativa (6 secções)

1. **Abertura** — “À rapariga por trás do meu sorriso favorito.” + botão visual “Tenho uma surpresa para ti”.
2. **Como tudo começou** — encontro através da associação de estudantes.
3. **A nossa história** — timeline com três momentos (início; 20.10.2026; 24.11.2026).
4. **O teu sorriso** — destaque ao sorriso de Flora.
5. **Uma carta para Flora** — cartão/papel com texto aprovado; revelação via envelope (Fase 3).
6. **O primeiro beijo** — fecho intimista em Midnight Blue; 24.11.2026; “E este é apenas o começo.”

---

## Interação da carta (Fase 3)

### Comportamento

1. O botão **“Tenho uma surpresa para ti”** (`#btn-surpresa`) desloca a vista até `#carta`.
2. Sequência visual curta: envelope fechado → abertura da aba → saída do papel → carta legível.
3. Após a revelação, a carta permanece aberta; o botão não reinicia a animação.

### Markup acrescentado

- `.carta__stage` — contentor da composição
- `.carta__envelope` / `.carta__envelope-back` / `.carta__flap` / `.carta__envelope-front` / `.carta__seal` — estrutura decorativa do envelope
- `#carta-live` — região `aria-live="polite"` para anunciar a revelação
- Texto da carta dentro de `.carta__papel` **inalterado**

### Estados CSS / JS

| Estado | Classes | Efeito |
| ------ | ------- | ------ |
| Sem enhancement | (sem `html.js-carta`) | Carta aberta e legível (progressive enhancement) |
| Selado | `html.js-carta` + carta sem `is-open`/`is-opening` | Envelope visível; papel oculto |
| A abrir | `.is-opening` | Aba com `rotateX`; papel emerge (`opacity`/`transform`) |
| Aberto | `.is-open` | Papel em fluxo normal; envelope oculto |

### Movimento reduzido

Com `prefers-reduced-motion: reduce`: scroll instantâneo e revelação imediata, sem sequência animada.

### Tokens novos

`--envelope-height`, `--envelope-body`, `--envelope-body-deep`, `--envelope-flap`, `--envelope-edge`, `--motion-flap`, `--motion-paper`, `--motion-envelope-fade`.

---

## História confirmada (não inventar além disto)

- Conheceram-se através da associação de estudantes.
- Relação oficial: 20/10/2026.
- Celebração adiada por compromissos escolares e da equipa.
- Celebração e primeiro beijo: 24/11/2026.
- O sorriso de Flora é especialmente apreciado por Ederson.
- Sem fotografias do casal disponíveis.

---

## Direção estética

- Minimalista, elegante, editorial, mobile-first.
- Espaçamento generoso; animações discretas (motion completo na Fase 3).
- Sem gradientes excessivos, emojis centrais, stock de casais, ou botões genéricos.

---

## Tokens CSS

Definidos em `css/style.css` como variáveis `:root` (`--color-*`, `--font-*`, `--space-*`).

---

## Ilustrações SVG

| Ficheiro           | Secção   | Intenção                          |
| ------------------ | -------- | --------------------------------- |
| `flourish.svg`     | Abertura | Ornamento tipográfico discreto    |
| `connection.svg`   | Origem   | Dois círculos que se encontram    |
| `smile-curve.svg`  | Sorriso  | Curva abstrata de sorriso         |
| `moment.svg`       | Fecho    | Marca circular íntima             |

---

## Fora de âmbito / pendente

- Animações de entrada nas restantes secções (opcional, futuras iterações)
- Publicação GitHub Pages (Fase 4)
