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
import { setFieldError, setFieldValue } from "../actions";

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

  const typeOfSupportValue: RadioOptions = reduxTypeOfSupport.value;
  const shelterValue: Option = reduxShelter.value;
  const shelterError = reduxShelter.errorMsg;
  const priceValue: OptionPrice = reduxPrice.value;
  const priceError = reduxPrice.errorMsg;

  const [shelteroOptions, setShelterOptions] = React.useState<Option[] | []>([
    { label: "Selected value 1" },
    { label: "Selected value 2" },
    { label: "Selected value 3" },
  ]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://frontend-assignment-api.goodrequest.com/api/v1/shelters"
        );
        const { shelters } = await res.json();
        const mappedShelters = shelters.map((s: any) => {
          return { label: s.name, value: s.id };
        });
        setShelterOptions(mappedShelters);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleChangePage = () => {
    if (
      shelterError &&
      typeOfSupportValue === 0 &&
      !(shelterValue === SHELTER_DEFAULT_OPTION)
    ) {
      dispatch(setFieldError("shelter", ""));
    }

    if (priceError && priceValue !== null) {
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
    // eslint-disable-next-line
  }, []);

  return (
    <SupportFormLayout
      title="Vyberte si možnosť, ako chcete pomôcť"
      currentStep={1}
    >
      <InpurRadioWrapper>
        <InputRadio
          active={typeOfSupportValue}
          handleChange={(active: RadioOptions) => {
            if (active === 1 && shelterError) {
              dispatch(setFieldError("shelter", ""));
            }
            dispatch(setFieldValue("typeOfSupport", active));
          }}
        />
      </InpurRadioWrapper>
      <InputSubtitleWrapper>
        <SubtitleAboutWrapper>
          <SubtitleH3>O projekte</SubtitleH3>
          <NotRequied>
            {typeOfSupportValue === 0 ? "Povinné" : "Nepovinné"}
          </NotRequied>
        </SubtitleAboutWrapper>
        <InputWrapper>
          <InputSelect
            selected={shelterValue}
            options={shelteroOptions}
            defaultOption={SHELTER_DEFAULT_OPTION}
            handleChange={(option: Option) => {
              if (shelterError) {
                dispatch(setFieldError("shelter", ""));
              }
              dispatch(setFieldValue("shelter", option));
            }}
            errorMsg={shelterError}
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <InputSubtitleWrapper>
        <SubtitleH3>Suma, ktorou chcem prispieť</SubtitleH3>
        <InputWrapper>
          <InputSelectPrice
            selected={priceValue}
            options={PRICE_OPTIONS}
            handleChange={(option: OptionPrice | null) => {
              if (priceError) {
                dispatch(setFieldError("price", ""));
              }
              dispatch(setFieldValue("price", option));
            }}
            errorMsg={priceError}
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
