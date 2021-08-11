import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  width: 100%;
  max-width: ${rem(1200)};
  margin: 0 auto;
  padding: 0 ${rem(30)};
`;

export const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const LayoutMainContent = styled.div`
  flex: 1 0 auto;
`;

export const Header = styled.header`
  width: 100%;
`;

export const Main = styled.header`
  width: 100%;
`;

export const Footer = styled.footer`
  width: 100%;
  flex-shrink: 0;
`;
