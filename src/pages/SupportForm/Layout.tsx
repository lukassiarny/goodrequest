import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Steps from "../../components/Steps";
import { Container } from "../../theme/layout";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding: ${rem(96)} 0;
`;

const FormWrapper = styled.div`
  flex: 0 1 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormTitle = styled.h1`
  font-family: ${({ theme }) => theme.font.familySecondary};
  font-size: ${rem(46)};
  font-weight: 700;
  line-height: ${rem(52)};
  margin: ${rem(32)} 0;
`;

const ImageWrapper = styled.div`
  flex: 0 1 33.3333%;

  & > img {
    max-width: 100%;
    height: auto;
  }
`;

export const Subtitle = styled.h3`
  font-weight: 800;
`;

export const InputWrapper = styled.div`
  margin-top: ${rem(16)};
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

type Props = {
  currentStep?: number;
  title?: string;
};

const SupportUsLayout: React.FC<Props> = ({
  currentStep = 1,
  title = "",
  children,
}) => {
  return (
    <StyledContainer>
      <FormWrapper>
        <Steps currentStep={currentStep} />
        <FormTitle>{title}</FormTitle>
        {children}
      </FormWrapper>
      <ImageWrapper>
        <img src="/assets/dogimage.jpg" alt="Nadácia Good boy" />
      </ImageWrapper>
    </StyledContainer>
  );
};

export default SupportUsLayout;
