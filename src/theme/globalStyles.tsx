import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: ${({ theme }) => theme.font.fontSizeDesktop};  
  }

  body {
    font-family: ${({ theme }) => theme.font.familyPrimary};
    background: ${({ theme }) => theme.colors.mainBackground};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: antialiased;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
