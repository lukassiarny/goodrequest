import { rem } from "polished";
import React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  value: boolean;
  errorMsg: string;
  onValueChange: () => void;
};

const Wrapper = styled.div``;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 8;
`;

const FakeInput = styled.div<{ error?: boolean }>`
  flex: 0 0 auto;
  width: ${rem(34)};
  height: ${rem(34)};
  border-radius: ${rem(8)};
  border: ${rem(1)} solid
    ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.primaryLight};
  margin-right: ${rem(16)};
  position: relative;
`;

const FakeCheck = styled.div<{ checked: boolean }>`
  width: ${rem(8)};
  height: ${rem(2)};
  background: ${({ theme }) => theme.colors.primaryTwo};
  position: relative;
  margin-top: 50%;
  margin-left: 50%;
  transition: transform 150ms ease-in-out;
  transform: ${({ checked }) =>
    checked
      ? "translate(-100%, 50%) rotate(45deg) scale(1)"
      : "translate(-100%, 50%) rotate(45deg) scale(0)"};
  transform-origin: center;

  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    right: 0;
    height: ${rem(16)};
    width: ${rem(2)};
    background: ${({ theme }) => theme.colors.primaryTwo};
  }
`;

const Text = styled.span<{ error?: boolean }>`
  color: ${({ error, theme }) =>
    error ? theme.colors.error : "rgba(12, 2, 2, 0.8)"};
`;

const InputCheckbox: React.FC<Props> = ({
  label,
  value = false,
  onValueChange,
  errorMsg = "",
}) => {
  return (
    <Wrapper>
      <Label>
        <Input
          type="checkbox"
          name={label}
          checked={value}
          onChange={onValueChange}
        />
        <FakeInput error={!!errorMsg}>
          <FakeCheck checked={value} />
        </FakeInput>
        <Text error={!!errorMsg}>{errorMsg ? errorMsg : label}</Text>
      </Label>
    </Wrapper>
  );
};

export default InputCheckbox;
