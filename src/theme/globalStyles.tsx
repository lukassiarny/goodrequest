import { createGlobalStyle } from "styled-components";
import { mediaSize } from "./theme";

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

    
    @media (max-width: ${mediaSize.s}) {
      font-size: ${({ theme }) => theme.font.fontSizeMobile};  
    }
  }

  body {
    font-family: ${({ theme }) => theme.font.familyPrimary};
    background: ${({ theme }) => theme.colors.mainBackground};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: antialiased;
    line-height: ${({ theme }) => theme.font.lineHeight};
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
