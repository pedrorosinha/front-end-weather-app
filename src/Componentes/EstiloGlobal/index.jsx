import { createGlobalStyle } from "styled-components";

import TTSupermolotBold from "./Fontes/supermolot-otf/TT-Supermolot-Bold.ttf" 
import TTSupermolotRegular from "./Fontes/supermolot-otf/TT-Supermolot-Regular.ttf" 

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'TTSupermolot-Regular';
        src: local('TTSupermolot-Regular') local('TT Supermolot Regular') url(${TTSupermolotRegular});
    }

    @font-face {
        font-family: 'TTSupermolot-Bold';
        src: local('TTSupermolot-Bold') local('TT Supermolot Bold') url(${TTSupermolotBold});
    }
  body, html {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;