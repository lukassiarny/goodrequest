import React from "react";
import styled from "styled-components";
import { Container } from "../../theme/layout";

const NavbarWrapper = styled.div`
  width: 100%;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <Container>Navbar</Container>
    </NavbarWrapper>
  );
};

export default Navbar;
