import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'TTSupermolot-Regular';
        src: local('TTSupermolot-Regular') url();
    }
  body, html {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;