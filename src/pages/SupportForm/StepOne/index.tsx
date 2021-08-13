import { rem } from "polished";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import Button from "../../../components/Button";
import InputRadio, { RadioOptions } from "../../../components/InputRadio";
import InputSelect, { Option } from "../../../components/InputSelect";
import InputSelectPrice, {
  OptionPrice,
} from "../../../components/InputSelectPrice";
import { SHELTER_DEFAULT_OPTION, PRICE_OPTIONS } from "../../../config";
import SupportFormLayout, {
  SubtitleH3,
  InputWrapper,
  InputSubtitleWrapper,
  ButtonsWrapper,
} from "../Layout";
import { fieldSelector } from "../selectors";
import {
  setFieldError,
  setTypeOfSupport,
  setSelectedShelter,
  setSelectedPrice,
} from "../actions";

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

const SupportFormStepOne: React.FC = () => {
  const reduxShelter = useAppSelector((state: RootState) =>
    fieldSelector(state, { fieldName: "shelter" })
  );

  const reduxPrice = useAppSelector((state: RootState) =>
    fieldSelector(state, { fieldName: "price" })
  );

  const reduxTypeOfSupport = useAppSelector((state: RootState) =>
    fieldSelector(state, { fieldName: "typeOfSupport" })
  );

  const selectedTypeOfSupport: RadioOptions = reduxTypeOfSupport.value;
  const selectedShelter: Option = reduxShelter.selected;
  const selectedShelterError = reduxShelter.errorMsg;
  const selectedPrice: OptionPrice = reduxPrice.selected;
  const selectedPriceError = reduxPrice.errorMsg;

  const [shelteroOptions, setShelterOptions] = React.useState<Option[] | []>([
    { label: "Selected value 1" },
    { label: "Selected value 2" },
    { label: "Selected value 3" },
  ]);

  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleChangePage = () => {
    if (
      selectedShelterError &&
      selectedTypeOfSupport === 0 &&
      !(selectedShelter === SHELTER_DEFAULT_OPTION)
    ) {
      dispatch(setFieldError("shelter", ""));
    }

    if (selectedPriceError && selectedPrice !== null) {
      dispatch(setFieldError("price", ""));
    }

    history.push("/vase-kontaktne-informacie");
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleChangePage();
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  });

  return (
    <SupportFormLayout
      title="Vyberte si možnosť, ako chcete pomôcť"
      currentStep={1}
    >
      <InpurRadioWrapper>
        <InputRadio
          active={selectedTypeOfSupport}
          handleChange={(active: RadioOptions) => {
            if (active === 1 && selectedShelterError) {
              dispatch(setFieldError("shelter", ""));
            }
            dispatch(setTypeOfSupport(active));
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
            defaultOption={SHELTER_DEFAULT_OPTION}
            handleChange={(option: Option) => {
              if (selectedShelterError) {
                dispatch(setFieldError("shelter", ""));
              }
              dispatch(setSelectedShelter(option));
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
            options={PRICE_OPTIONS}
            handleChange={(option: OptionPrice | null) => {
              if (selectedPriceError) {
                dispatch(setFieldError("price", ""));
              }
              dispatch(setSelectedPrice(option));
            }}
            errorMsg={selectedPriceError}
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <ButtonsWrapper>
        <Button text="Pokračovať" handleOnClick={handleChangePage} />
      </ButtonsWrapper>
    </SupportFormLayout>
  );
};

export default SupportFormStepOne;
