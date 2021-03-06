import { rem } from "polished";
import React from "react";
import styled, { css } from "styled-components";
import { TYPE_OF_SUPPORT } from "../../config";
import { mediaSize } from "../../theme/theme";

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: ${mediaSize.s}) {
    flex-direction: column;
  }
`;

const Label = styled.label<{ isActive: boolean }>`
  cursor: pointer;
  position: relative;
  flex: 50%;
  padding: ${rem(24)};
  font-weight: 600;
  transition: 150ms ease-in-out;
  display: flex;
  align-items: center;

  ${({ isActive, theme }) =>
    isActive
      ? css`
          background: ${`linear-gradient(180deg, ${theme.colors.primaryOne} 0%, ${theme.colors.primaryTwo} 100%)`};
          color: #fff;
          border: ${rem(1)} solid transparent;

          @media (min-width: ${mediaSize.s}) {
            box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
              0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
              0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
              0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
              0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
              0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
          }
        `
      : css`
          color: ${theme.colors.textMiddle};
          border: ${rem(1)} solid ${({ theme }) => theme.colors.primaryOne};
        `}

  @media (min-width: ${mediaSize.s}) {
    flex-direction: column;
    align-items: flex-start;
  }

  &:first-of-type {
    order: 1;
    border-bottom-left-radius: ${rem(8)};
    border-bottom-right-radius: ${rem(8)};

    @media (min-width: ${mediaSize.s}) {
      order: -1;
      border-bottom-right-radius: ${rem(0)};
      border-top-left-radius: ${rem(24)};
      border-bottom-left-radius: ${rem(24)};
    }
  }

  &:last-of-type {
    border-top-right-radius: ${rem(8)};
    border-top-left-radius: ${rem(8)};

    @media (min-width: ${mediaSize.s}) {
      border-top-left-radius: ${rem(0)};
      border-top-right-radius: ${rem(24)};
      border-bottom-right-radius: ${rem(24)};
    }
  }
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const Icon = styled.div`
  width: ${rem(80)};
  height: ${rem(80)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${rem(30)};
  border-radius: 50%;
  margin-bottom: ${rem(16)};
  margin-right: ${rem(16)};
  background: rgba(47, 47, 47, 0.16);
  font-weight: 400;
  flex: 0 0 auto;
`;

export type RadioOptions = 0 | 1;

type Props = {
  active: RadioOptions;
  handleChange: (active: RadioOptions) => void;
};

const RadioInput: React.FC<Props> = ({ active, handleChange }) => {
  return (
    <Wrapper>
      <Label isActive={active === 0}>
        <Input
          type="radio"
          id="support-type"
          name="support-type"
          value="0"
          checked={active === 0}
          onChange={() => handleChange(0)}
        />
        <Icon>
          <i className="far fa-folder-open"></i>
        </Icon>
        {TYPE_OF_SUPPORT[0]}
      </Label>
      <Label isActive={active === 1}>
        <Input
          type="radio"
          id="support-type"
          name="support-type"
          value="1"
          checked={active === 1}
          onChange={() => handleChange(1)}
        />
        <Icon>
          <i className="fas fa-paw"></i>
        </Icon>
        {TYPE_OF_SUPPORT[1]}
      </Label>
    </Wrapper>
  );
};

export default RadioInput;
