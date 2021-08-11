import { rem } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../theme/layout";

const Divider = styled.hr`
  border-bottom: none;
  border-top: ${rem(1)} solid ${({ theme }) => theme.colors.borderColor};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: ${rem(96)} 0;
`;

const LogoWrapper = styled.div`
  flex: 0 1 33.333%;

  & > a {
    text-decoration: none;
    display: flex;
    width: fit-content;

    & > :first-child {
      margin-right: ${rem(8)};
    }
  }
`;

const Columns = styled.div`
  flex: 0 1 66.6666%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Col = styled.div`
  flex: 0 1 ${rem(170)};
  margin: ${rem(16)};

  &:last-of-type {
    margin: ${rem(16)} 0 ${rem(16)} ${rem(16)};
  }
`;

const ColTitle = styled.h3`
  font-weight: 800;
  font-size: ${rem(16)};
  line-height: ${rem(21)};
  margin-bottom: ${rem(24)};
`;

const ColList = styled.ul``;

const ColListItem = styled.li`
  padding: ${rem(4)} 0;

  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textMiddle};
    line-height: ${rem(24)};

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

const ColText = styled.div`
  line-height: ${rem(21)};
  color: ${({ theme }) => theme.colors.textMiddle};
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <Divider />
      <Row>
        <LogoWrapper>
          <Link to="/">
            <img src="/assets/logo-img.svg" alt="Good boy" />
            <img src="/assets/logo-text.svg" alt="Good boy" />
          </Link>
        </LogoWrapper>
        <Columns>
          <Col>
            <ColTitle>Nadácia Good Boy</ColTitle>
            <ColList>
              <ColListItem>
                <Link to="/o-projekte">O projekte</Link>
              </ColListItem>
              <ColListItem>
                <Link to="/ako-na-to">Ako na to</Link>
              </ColListItem>
              <ColListItem>
                <Link to="/kontakt">Kontakt</Link>
              </ColListItem>
            </ColList>
          </Col>
          <Col>
            <ColTitle>Nadácia Good Boy</ColTitle>
            <ColText>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                in interdum ipsum, sit amet.
              </p>
            </ColText>
          </Col>
          <Col>
            <ColTitle>Nadácia Good Boy</ColTitle>
            <ColText>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                in interdum ipsum, sit amet.
              </p>
            </ColText>
          </Col>
        </Columns>
      </Row>
    </Container>
  );
};

export default Footer;
