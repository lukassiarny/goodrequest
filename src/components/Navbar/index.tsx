import { rem } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../theme/layout";

const NavbarWrapper = styled.div`
  width: 100%;
  height: ${rem(40)};
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08);
  background: ${({ theme }) => theme.colors.navbarBackground};
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const TitleLink = styled(Link)`
  font-size: ${rem(14)};
  font-weight: 600;
  line-height: ${rem(16.45)};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textLight};
`;

const IconsWrapper = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: ${rem(8)};
  }
`;

const SocialIcon = styled.a`
  width: ${rem(24)};
  height: ${rem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem(18)};
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <StyledContainer>
        <TitleLink to="/">Nadácia Good Boy</TitleLink>
        <IconsWrapper>
          <SocialIcon href="https://www.facebook.com/" target="_blank">
            <i className="fab fa-facebook-f"></i>
          </SocialIcon>
          <SocialIcon href="https://www.instagram.com/" target="_blank">
            <i className="fab fa-instagram"></i>
          </SocialIcon>
        </IconsWrapper>
      </StyledContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
