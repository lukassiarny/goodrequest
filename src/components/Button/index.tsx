import { rem } from "polished";
import React from "react";
import styled, { css } from "styled-components";

type ButtonStyle = "primary" | "secondary";

type Props = {
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
  isLoading?: boolean;
  text: string | number;
  handleOnClick: () => void;
};

const ButtonWrapper = styled.div`
  position: relative;
  min-width: ${rem(112)};
  margin-top: ${rem(24)};
`;

const Button = styled.button<{ buttonStyle: ButtonStyle; disabled: boolean }>`
  padding: 0 ${rem(24)};
  position: relative;
  height: ${rem(60)};
  border-radius: 999px;
  width: 100%;
  border: none;
  font-size: ${rem(14)};
  font-weight: 800;
  transition: color 150ms ease-in-out;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  z-index: 1;

  ${({ buttonStyle, theme }) =>
    buttonStyle === "primary" &&
    css`
      background: ${theme.colors.textLight};
      color: #fff;
      box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
        0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
        0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
        0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
        0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
        0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
    `}

  ${({ buttonStyle, theme }) =>
    buttonStyle === "secondary" &&
    css`
      background: ${theme.colors.primaryLight};
      color: ${theme.colors.textPrimary};
    `}

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    transition: opacity 150ms ease-out;
    background: ${({ theme }) =>
      `linear-gradient(115.41deg, ${theme.colors.primaryOne} -1.77%, ${theme.colors.primaryTwo} 73.03%)`};
    z-index: 2;
    opacity: 0;
  }

  &:hover,
  &:focus {
    ${({ disabled }) =>
      !disabled &&
      css`
        color: #fff;

        &:after {
          opacity: 1;
        }
      `}
  }

  & span {
    position: relative;
    z-index: 3;
  }
`;

const LoadingDisabledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #fff;
  opacity: 0.5;
  cursor: not-allowed;
  z-index: 4;

  & > img {
    max-width: ${rem(80)};
  }
`;

const TextInput: React.FC<Props> = ({
  buttonStyle = "primary",
  disabled = false,
  isLoading = false,
  text,
  handleOnClick,
}) => {
  return (
    <ButtonWrapper>
      {isLoading && (
        <LoadingDisabledWrapper>
          <img src="/assets/Spinner.svg" alt="Spinner" />
        </LoadingDisabledWrapper>
      )}
      {disabled && !isLoading && <LoadingDisabledWrapper />}
      <Button
        buttonStyle={buttonStyle}
        disabled={disabled || isLoading}
        onClick={handleOnClick}
      >
        <span>{text}</span>
      </Button>
    </ButtonWrapper>
  );
};

export default TextInput;
