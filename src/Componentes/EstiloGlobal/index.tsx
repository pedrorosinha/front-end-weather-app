import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'TTSupermolot-Regular';
    src: url('/fonts/TT-Supermolot-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'TTSupermolot-Bold';
    src: url('/fonts/TT-Supermolot-Bold.ttf') format('truetype');
  }

  body, html {
    margin: 0;
    padding: 0;
    font-family: 'TTSupermolot-Regular',
  }
`;

export default GlobalStyles;