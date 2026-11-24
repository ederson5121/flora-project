/**
 * Project Flora — interactions.js
 * Fase 3: botão de surpresa → scroll até #carta → revelação do envelope.
 *
 * A classe html.js-carta só é aplicada se este script inicializar com sucesso,
 * para que uma falha de JS não esconda permanentemente o texto da carta.
 */
(function () {
  "use strict";

  var TIMING = {
    afterScroll: 180,
    paperMs: 840,
    reducedSettle: 40
  };

  var button = document.getElementById("btn-surpresa");
  var section = document.getElementById("carta");
  var carta = document.getElementById("carta-revelacao");
  var papel = carta ? carta.querySelector(".carta__papel") : null;
  var live = document.getElementById("carta-live");
  var nota = document.getElementById("surpresa-nota");

  if (!button || !section || !carta || !papel) {
    return;
  }

  var isBusy = false;
  var hasRevealed = false;

  function prefersReducedMotion() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function announce(message) {
    if (!live) {
      return;
    }
    live.textContent = "";
    window.setTimeout(function () {
      live.textContent = message;
    }, 30);
  }

  function prepareSealed() {
    document.documentElement.classList.add("js-carta");
    carta.classList.remove("is-opening", "is-open");
    papel.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
  }

  function finishOpen() {
    carta.classList.remove("is-opening");
    carta.classList.add("is-open");
    papel.removeAttribute("aria-hidden");
    button.setAttribute("aria-expanded", "true");
    hasRevealed = true;
    isBusy = false;

    if (nota) {
      nota.textContent = "A carta está aberta.";
    }

    announce("A carta foi revelada.");
  }

  function openWithMotion() {
    carta.classList.add("is-opening");

    window.setTimeout(function () {
      finishOpen();
    }, TIMING.paperMs);
  }

  function openReduced() {
    carta.classList.add("is-opening");
    window.setTimeout(finishOpen, TIMING.reducedSettle);
  }

  function scrollToLetter(behavior) {
    section.scrollIntoView({ behavior: behavior, block: "start" });
  }

  function reveal() {
    if (hasRevealed || isBusy) {
      if (hasRevealed) {
        scrollToLetter(prefersReducedMotion() ? "auto" : "smooth");
      }
      return;
    }

    isBusy = true;
    button.setAttribute("aria-expanded", "true");

    var reduced = prefersReducedMotion();
    scrollToLetter(reduced ? "auto" : "smooth");

    window.setTimeout(
      function () {
        if (reduced) {
          openReduced();
        } else {
          openWithMotion();
        }
      },
      reduced ? TIMING.reducedSettle : TIMING.afterScroll
    );
  }

  prepareSealed();

  if (nota) {
    nota.textContent = "A surpresa espera por ti na carta.";
  }

  button.addEventListener("click", function () {
    reveal();
  });
})();
