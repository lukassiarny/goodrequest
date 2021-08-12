import { rem } from "polished";
import React from "react";
import styled, { css } from "styled-components";
import { InputWrapper } from "../../pages/SupportForm/Layout";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInputWrapper = styled(InputWrapper)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  & > :not(:last-child) {
    margin-right: ${rem(8)};
  }
`;

const Input = styled.div<{ isActive: boolean }>`
  padding: ${rem(16)};
  border-radius: ${rem(8)};
  font-weight: 800;
  position: relative;
  border-width: ${rem(1)};
  border-style: solid;
  cursor: pointer;
  line-height: ${rem(21)};
  margin-bottom: ${rem(8)};
  transition: 150ms ease-in-out;

  ${({ isActive, theme }) =>
    isActive
      ? css`
          background: ${`linear-gradient(115.41deg, ${theme.colors.primaryOne} -1.77%, ${theme.colors.primaryTwo} 73.03%)`};
          border-color: transparent;
          color: #fff;
        `
      : css`
          color: ${theme.colors.textPrimary};
          border-color: ${({ theme }) => theme.colors.borderColor};
        `}
`;

const NumberInputField = styled.input<{ isActive: boolean }>`
  width: ${rem(48)};
  height: ${rem(21)};
  outline: none;
  background: transparent;
  font-size: ${rem(16)};
  border-top: none;
  border-left: none;
  margin-right: ${rem(8)};
  border-right: none;
  border-bottom: ${rem(1)} solid ${({ theme }) => theme.colors.borderColor};
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${({ isActive, theme }) =>
    isActive
      ? css`
          color: #fff;
        `
      : css`
          color: ${theme.colors.textPrimary};
          border-color: ${theme.colors.borderColor};
        `}
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  display: inline-block;
  font-size: ${rem(14)};
  position: absolute;
  bottom: ${rem(-14)};
`;

export type OptionPrice = {
  type: "static" | "dynamic";
  value: number;
};

type Props = {
  options: OptionPrice[];
  selected?: OptionPrice | null;
  defaultValue?: OptionPrice;
  handleChange: (option: OptionPrice | null) => void;
  hasDynamicInput?: boolean;
  errorMsg?: string;
};

const Price: React.FC<Props> = ({
  options,
  selected,
  handleChange,
  hasDynamicInput = true,
  errorMsg,
}) => {
  const [dynamicInputValue, setDynamicInputValue] = React.useState(
    selected?.type === "dynamic" ? selected?.value : ""
  );
  const [isDynamicInputActive, setIsDynamicInputActive] = React.useState(
    selected?.type === "dynamic" ? true : false
  );
  const dynamicInputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <Wrapper>
      <StyledInputWrapper>
        {options &&
          options.length > 0 &&
          options.map((o: OptionPrice, i) => {
            if (o.type === "dynamic") {
              return null;
            }

            return (
              <Input
                key={i}
                isActive={selected?.value === o.value && !isDynamicInputActive}
                onClick={() => {
                  if (isDynamicInputActive) {
                    setIsDynamicInputActive(false);
                  }
                  handleChange(o);
                }}
              >
                {o.value} €
              </Input>
            );
          })}
        {hasDynamicInput && (
          <Input
            isActive={isDynamicInputActive}
            onClick={() => {
              dynamicInputRef?.current?.focus();
            }}
          >
            <NumberInputField
              type="number"
              ref={dynamicInputRef}
              step="1"
              isActive={isDynamicInputActive}
              onBlur={() => {
                if (dynamicInputValue) {
                  setIsDynamicInputActive(true);
                  handleChange({
                    type: "dynamic",
                    value: Number(dynamicInputValue),
                  });
                } else {
                  setIsDynamicInputActive(false);
                  handleChange(null);
                }
              }}
              onFocus={() => setIsDynamicInputActive(true)}
              value={dynamicInputValue}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setDynamicInputValue(e.currentTarget.value)
              }
            />
            €
          </Input>
        )}
      </StyledInputWrapper>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </Wrapper>
  );
};

export default Price;
