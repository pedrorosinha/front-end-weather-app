import { createGlobalStyle } from "styled-components";

import TTSupermolotRegular from "./Fontes/supermolot-otf/TT-Supermolot-Bold.otf" 

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'TTSupermolot-Regular';
        src: local('TTSupermolot-Regular') local('TT Supermolot Regular') url(${TTSupermolotRegular});
    }
  body, html {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;