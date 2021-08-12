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
  SubtitleH3,
  InputWrapper,
  InputSubtitleWrapper,
  ButtonsWrapper,
} from "../Layout";

const InpurRadioWrapper = styled.div`
  margin-bottom: ${rem(56)};
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

  const [selectedShelterError, setSelectedShelterError] = React.useState("");

  const [selectedPrice, setSelectedPrice] = React.useState<OptionPrice | null>(
    optionsPrice[0]
  );

  const [selectedPriceError, setSelectedPriceError] = React.useState("");

  const history = useHistory();

  const handleChangeNextPage = () => {
    setSelectedShelterError("");
    setSelectedPriceError("");

    let error = false;

    if (selectedTypeOfSupport === 0 && selectedShelter.value === null) {
      error = true;
      setSelectedShelterError("Vyberte útulok, ktorému chcete pômocť.");
    }

    if (selectedPrice === null) {
      error = true;
      setSelectedPriceError("Vyberte sumu, ktorou chcete prispieť");
    }

    if (error) {
      return;
    }

    history.push("/vase-kontaktne-informacie");
  };

  return (
    <SupportFormLayout
      title="Vyberte si možnosť, ako chcete pomôcť"
      currentStep={1}
    >
      <InpurRadioWrapper>
        <InputRadio
          active={selectedTypeOfSupport}
          handleChange={(active: TypeOfSupport) => {
            if (active === 1 && selectedShelterError) {
              setSelectedShelterError("");
            }
            setSelectedTypeOfSupport(active);
          }}
        />
      </InpurRadioWrapper>
      <InputSubtitleWrapper>
        <SubtitleAboutWrapper>
          <SubtitleH3>O projekte</SubtitleH3>
          <NotRequied>
            {selectedTypeOfSupport === 0 ? "Povinné" : "Nepovinné"}
          </NotRequied>
        </SubtitleAboutWrapper>
        <InputWrapper>
          <InputSelect
            selected={selectedShelter}
            options={shelteroOptions}
            defaultOption={defaultOption}
            handleChange={(option: Option) => {
              if (selectedShelterError) {
                setSelectedShelterError("");
              }
              setSelectedShelter(option);
            }}
            clearable={false}
            errorMsg={selectedShelterError}
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <InputSubtitleWrapper>
        <SubtitleH3>Suma, ktorou chcem prispieť</SubtitleH3>
        <InputWrapper>
          <InputSelectPrice
            selected={selectedPrice}
            options={optionsPrice}
            handleChange={(option: OptionPrice | null) => {
              if (selectedPriceError) {
                setSelectedPriceError("");
              }
              setSelectedPrice(option);
            }}
            errorMsg={selectedPriceError}
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <ButtonsWrapper>
        <Button text="Pokračovať" handleOnClick={handleChangeNextPage} />
      </ButtonsWrapper>
    </SupportFormLayout>
  );
};

export default SupportFormStepOne;
