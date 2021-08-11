import React from "react";
import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  width: 100%;
  max-width: ${rem(1200)};
  margin: 0 auto;
  padding: 0 ${rem(30)};
`;

export const FlexContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

export const Header = styled.header`
  width: 100%;
`;

export const Main = styled.header`
  width: 100%;
`;

export const Footer = styled.footer`
  width: 100%;
`;
