import React from "react";
import styled from "styled-components";
import { Container } from "../../theme/layout";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  flex: 0 1 50%;
`;

const ImageWrapper = styled.div`
  flex: 0 1 33.3333%;
`;

const SupportUsLayout: React.FC = ({ children }) => {
  return (
    <StyledContainer>
      <FormWrapper>{children}</FormWrapper>
      <ImageWrapper>a</ImageWrapper>
    </StyledContainer>
  );
};

export default SupportUsLayout;
