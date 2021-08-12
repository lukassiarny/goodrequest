import { rem } from "polished";
import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => rem(width)};
  height: ${rem(6)};
  display: flex;
  gap: ${rem(5)};
`;

const Step = styled.div<{ isCurrent: boolean }>`
  height: 100%;
  border-radius: 999px;

  ${({ isCurrent, theme }) =>
    isCurrent
      ? css`
          flex: 2;
          background: ${`linear-gradient(94.75deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100.7%), ${theme.colors.primaryOne}`};
        `
      : css`
          flex: 1;
          background: ${theme.colors.borderColor};
        `}
`;

type Props = {
  currentStep?: number;
  totalSteps?: number;
};

const Steps: React.FC<Props> = ({ currentStep = 1, totalSteps = 3 }) => {
  return (
    <Wrapper width={45 + 25 * (totalSteps - 1)}>
      {[...Array(totalSteps)].map((step, i) => (
        <Step key={i} isCurrent={i + 1 === currentStep} />
      ))}
    </Wrapper>
  );
};

export default Steps;
