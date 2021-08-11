import { rem } from "polished";
import React from "react";
import styled, { css } from "styled-components";

const PriceTag = styled.div<{ isActive: boolean }>`
  padding: ${rem(16)};
  border-radius: ${rem(8)};
  font-weight: 800;
  display: inline-block;
  cursor: pointer;

  ${({ isActive, theme }) =>
    isActive
      ? css`
          background: ${`linear-gradient(115.41deg, ${theme.colors.primaryOne} -1.77%, ${theme.colors.primaryTwo} 73.03%)`};
          color: #fff;
        `
      : css`
          color: ${theme.colors.textPrimary};
          border: ${rem(1)} solid ${({ theme }) => theme.colors.borderColor};
        `}
`;

type Props = {
  active?: boolean;
  type?: "static" | "userinput";
  value?: number;
  onChangeValue?: (value: number) => void;
};

const Price: React.FC<Props> = ({
  type = "static",
  value = 5,
  onChangeValue,
  active = true,
}) => {
  return <PriceTag isActive={active}>{value} €</PriceTag>;
};

export default Price;
