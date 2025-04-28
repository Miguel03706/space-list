import React from "react";
import BotaoFiltro from "./components/Button_filter/Button_filter";
import { createRoot } from "react-dom/client";
import "./content.css";

export function criarBotaoFiltro(): void {
  if (document.querySelector("#container-botao-filtro")) return;

  // Cria um container no body
  const container = document.createElement("div");
  container.id = "container-botao-filtro";

  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<BotaoFiltro />);
}

// Adiciona espaçamento em um container específico
function criarEspacamento(): void {
  // const container = document.getElementsByClassName('x78zum5 xdt5ytf x5yr21d') as HTMLCollectionOf<HTMLElement>;
  const container = document.getElementsByClassName('two _aigs x1n2onr6 x13vifvy') as HTMLCollectionOf<HTMLElement>;

  if (container.length > 0) {
    container[0].style.marginTop = '20px';
    console.log('Elemento encontrado');
  } else {
    console.log('Elemento não encontrado');
  }
}

// Espera a página carregar e depois executa as funções
window.onload = (): void => {
  setTimeout(() => {
    criarBotaoFiltro();
  }, 2000);

  setTimeout(() => {
    criarEspacamento();
  }, 5000);
};
