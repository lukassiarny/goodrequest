import React from "react";
import styled from "styled-components";
import { FlexContainer } from "../../theme/layout";

const StyledFlexContainer = styled(FlexContainer)`
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
    <StyledFlexContainer>
      <FormWrapper>{children}</FormWrapper>
      <ImageWrapper>a</ImageWrapper>
    </StyledFlexContainer>
  );
};

export default SupportUsLayout;
