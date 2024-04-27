import { createGlobalStyle } from "styled-components"; 

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'TTSupermolot-Regular';
        src: url('/src/Componentes/EstiloGlobal/Fontes/supermolot-ttf/TT-Supermolot-Regular.ttf') format('ttf');
    }

    @font-face {
        font-family: 'TTSupermolot-Bold';
        src: url('/src/Componentes/EstiloGlobal/Fontes/supermolot-ttf/TT-Supermolot-Bold.ttf');
    }
  body, html {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;