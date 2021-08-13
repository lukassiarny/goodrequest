import { rem } from "polished";
import React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  placeholder?: string;
  inputType?: "text" | "phone";
  value: string;
  errorMsg?: string;
  handleBlur: (value: string) => void;
};

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ inputType: "text" | "phone"; error: boolean }>`
  width: 100%;
  padding-top: ${({ inputType }) =>
    inputType === "phone" ? rem(43) : rem(37)};
  padding-right: ${rem(24)};
  padding-bottom: ${rem(16)};
  padding-left: ${({ inputType }) =>
    inputType === "phone" ? rem(60) : rem(24)};
  font-size: ${rem(16)};
  line-height: ${rem(21)};
  border: ${rem(1)} solid
    ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.borderColor};
  border-radius: ${rem(8)};
  transition: border 150ms ease-in-out;

  &::placeholder {
    font-size: ${rem(16)};
    line-height: ${rem(21)};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textLight};
  }

  &:-webkit-autofill {
    border: ${rem(1)} solid ${({ theme }) => theme.colors.borderColor};
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:-webkit-autofill::first-line {
    font-family: ${({ theme }) => theme.font.familyPrimary};
    font-size: ${rem(16)};
    line-height: ${rem(21)};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 500;
  }

  &:focus,
  &:active {
    outline: none;
    border: ${rem(1)} solid
      ${({ theme, error }) =>
        error ? theme.colors.error : theme.colors.primaryOne};
  }
`;

const Label = styled.label`
  position: absolute;
  font-weight: 800;
  top: ${rem(16)};
  left: ${rem(24)};
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  display: inline-block;
  margin-top: ${rem(8)};
  font-size: ${rem(14)};
`;

const Flag = styled.img`
  position: absolute;
  width: ${rem(23)};
  left: ${rem(24)};
  top: ${rem(43)};
`;

const getFlag = (value: string) =>
  value.trim().startsWith("+420") ? "czech" : "slovakia";

const TextInput: React.FC<Props> = ({
  label,
  inputType = "text",
  placeholder = "Vyplnte pole prosím...",
  value,
  handleBlur,
  errorMsg,
}) => {
  const [inputValue, setInputValue] = React.useState(value);

  return (
    <InputWrapper>
      <Label htmlFor={label}>{label}</Label>
      {inputType === "phone" && (
        <Flag src={`/assets/${getFlag(value)}.svg`} alt="" />
      )}
      <Input
        name={label}
        error={!!errorMsg}
        inputType={inputType}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setInputValue(e.currentTarget.value)
        }
        onBlur={() => handleBlur(inputValue)}
      />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </InputWrapper>
  );
};

export default TextInput;
