import { rem } from "polished";
import React from "react";
import styled, { css } from "styled-components";

export type Option = {
  label: string;
  value?: any;
};

type Props = {
  selected: Option;
  defaultOption?: Option;
  optionsError?: Option;
  options: Option[];
  label?: string;
  handleChange: (option: Option) => void;
  clearable?: boolean;
  errorMsg?: string;
};

const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Selected = styled.div<{
  isOpen: boolean;
  selected: Option;
  defaultOption: Option;
}>`
  width: 100%;
  cursor: pointer;
  height: ${rem(72)};
  border: ${rem(1)} solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${rem(8)};
  padding: 0 ${rem(24)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: #fff;
  position: relative;
  ${({ selected, theme, defaultOption }) =>
    selected.label === defaultOption.label &&
    css`
      color: ${theme.colors.textLight};
    `};
`;

const Label = styled.span`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const IconsWrapper = styled.div`
  position: absolute;
  right: ${rem(24)};
  height: 100%;
  color: ${({ theme }) => theme.colors.borderColor};
  display: flex;
  align-items: center;
  top: 0;
`;

const IconArrow = styled.i<{ isOpen: boolean }>`
  padding: 0.25rem;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "")};
`;

const IconRemove = styled.i`
  padding: 0.25rem;
`;

const SelectOptions = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  transform-origin: top;
  transform: ${({ isOpen }) => (isOpen ? "scale(1,1)" : "scale(1,0)")};
  z-index: 10;
  min-width: ${rem(160)};
  background: ${({ theme }) => theme.colors.mainBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: background 150ms ease-in-out, color 150ms ease-in-out,
    transform 150ms ease-in-out;
  max-height: 400px;
  width: 100%;
  overflow-y: auto;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

const SelectOption = styled.li<{ isOpen: boolean; isSelected: boolean }>`
  width: 100%;
  padding: ${rem(8)} ${rem(24)};
  cursor: pointer;
  transition: background 100ms ease-out, opacity 500ms ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background: ${({ isSelected }) =>
    isSelected ? "rgba(0,0,0,0.05)" : "transparent"};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Error = styled.span<{ errorMsg: string }>`
  position: absolute;
  width: 100%;
  margin-top: 0.25rem;
  left: 0.5rem;
  top: 100%;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  transform-origin: top;
  transform: ${({ errorMsg }) => (errorMsg ? "scale(1, 1)" : "scale(1, 0)")};
  opacity: ${({ errorMsg }) => (errorMsg ? "1" : "0")};
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
`;

const SelectMenu: React.FC<Props> = ({
  selected,
  options,
  label = "Vyberte možnosť",
  handleChange,
  defaultOption = { label: "Vyberte jednu z možností" },
  optionsError = { label: "Niečo sa pokazilo" },
  clearable = true,
  errorMsg = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperEl = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperEl.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <SelectWrapper ref={wrapperEl}>
      <Selected
        onClick={() => setIsOpen(!isOpen)}
        selected={selected}
        isOpen={isOpen}
        defaultOption={defaultOption as any}
      >
        <Label>{label}</Label>
        {selected.label}
        <IconsWrapper>
          <IconArrow className="fas fa-chevron-down" isOpen={isOpen} />
          {clearable && selected.label !== defaultOption.label && (
            <IconRemove
              className="fas fa-times select-remove"
              onClick={() => handleChange(defaultOption)}
            />
          )}
        </IconsWrapper>
      </Selected>
      <SelectOptions isOpen={isOpen}>
        {options.length > 0 &&
          options.map((option: Option, index: number) => (
            <SelectOption
              onClick={() => {
                if (option.label !== optionsError.label) {
                  handleChange(option);
                }
                setIsOpen(false);
              }}
              isSelected={selected.label === option.label}
              key={index}
              isOpen={isOpen}
            >
              {option.label}
            </SelectOption>
          ))}
      </SelectOptions>
      <Error errorMsg={errorMsg}>{errorMsg}</Error>
    </SelectWrapper>
  );
};

export default SelectMenu;
