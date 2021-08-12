import { rem } from "polished";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import InputRadio, { TypeOfSupport } from "../../../components/InputRadio";
import InputSelect, { Option } from "../../../components/InputSelect";
import InputSelectPrice, {
  OptionPrice,
} from "../../../components/InputSelectPrice";
import SupportFormLayout, {
  Subtitle,
  InputWrapper,
  ButtonsWrapper,
} from "../Layout";

const InpurRadioWrapper = styled.div`
  margin-bottom: ${rem(56)};
`;

const InputSubtitleWrapper = styled.div`
  margin-bottom: ${rem(40)};
  width: 100%;
`;

const SubtitleAboutWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

const NotRequied = styled.span`
  font-size: ${rem(14)};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMiddle};
`;

const defaultOption = { label: "Vyberte útulok zo zoznamu", value: null };

const optionsPrice: OptionPrice[] = [
  { type: "static", value: 5 },
  { type: "static", value: 10 },
  { type: "static", value: 20 },
  { type: "static", value: 30 },
  { type: "static", value: 50 },
  { type: "static", value: 100 },
];

const SupportFormStepOne: React.FC = () => {
  const [selectedTypeOfSupport, setSelectedTypeOfSupport] =
    React.useState<TypeOfSupport>(0);

  const [selectedShelter, setSelectedShelter] =
    React.useState<Option>(defaultOption);
  const [shelteroOptions, setShelterOptions] = React.useState<Option[]>([
    { label: "Selected value 1" },
    { label: "Selected value 2" },
    { label: "Selected value 3" },
  ]);

  const [selectedPrice, setSelectedPrice] = React.useState<OptionPrice | null>(
    optionsPrice[0]
  );

  const history = useHistory();

  return (
    <SupportFormLayout
      title="Vyberte si možnosť, ako chcete pomôcť"
      currentStep={1}
    >
      <InpurRadioWrapper>
        <InputRadio
          active={selectedTypeOfSupport}
          handleChange={(active: TypeOfSupport) =>
            setSelectedTypeOfSupport(active)
          }
        />
      </InpurRadioWrapper>
      <InputSubtitleWrapper>
        <SubtitleAboutWrapper>
          <Subtitle>O projekte</Subtitle>
          <NotRequied>
            {selectedTypeOfSupport === 0 ? "Povinné" : "Nepovinné"}
          </NotRequied>
        </SubtitleAboutWrapper>
        <InputWrapper>
          <InputSelect
            selected={selectedShelter}
            options={shelteroOptions}
            defaultOption={defaultOption}
            handleChange={(option: Option) => setSelectedShelter(option)}
            clearable={false}
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <InputSubtitleWrapper>
        <Subtitle>Suma, ktorou chcem prispieť</Subtitle>
        <InputWrapper>
          <InputSelectPrice
            selected={selectedPrice}
            options={optionsPrice}
            handleChange={(option: OptionPrice | null) =>
              setSelectedPrice(option)
            }
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <ButtonsWrapper>
        <Button
          text="Pokračovať"
          handleOnClick={() => history.push("/vase-kontaktne-informacie")}
        />
      </ButtonsWrapper>
    </SupportFormLayout>
  );
};

export default SupportFormStepOne;
