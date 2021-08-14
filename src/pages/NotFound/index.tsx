import React from "react";
import styled from "styled-components";
import { Container } from "../../theme/layout";
import { rem } from "polished";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${rem(96)};
  margin-bottom: ${rem(96)};
  font-size: ${rem(24)};
`;

const NotFound: React.FC = () => {
  return (
    <StyledContainer>
      <p>Stránka nebola nájdená!</p>
    </StyledContainer>
  );
};

export default NotFound;
