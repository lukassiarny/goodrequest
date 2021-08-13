import { rem } from "polished";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Button from "../../../components/Button";
import {
  REGEX,
  SHELTER_DEFAULT_OPTION,
  TYPE_OF_SUPPORT,
} from "../../../config";
import { setFieldError } from "../actions";
import SupportFormLayout, {
  ButtonsWrapper,
  InputSubtitleWrapper,
  SubtitleH4,
} from "../Layout";
import { formSelector } from "../selectors";

const SummaryList = styled.ul``;

const SummaryListItem = styled.li`
  &:not(:last-of-type) {
    margin-bottom: ${rem(24)};
  }
`;

const Text = styled.span<{ error?: boolean }>`
  margin-top: ${rem(8)};
  display: inline-block;
  line-height: ${rem(19)};
  color: ${({ error, theme }) => (error ? theme.colors.error : "inherit")};
`;

const getFullName = (firstName: string, lastName: string) => {
  return !firstName && !lastName
    ? "-"
    : `${firstName ? firstName + " " : ""} ${lastName ? lastName : ""}`;
};

const SupportFormStepThree: React.FC = () => {
  const {
    typeOfSupport,
    shelter,
    price,
    firstName,
    lastName,
    email,
    phoneNumber,
  } = useAppSelector(formSelector);

  const selectedTypeOfSupport = typeOfSupport.value;
  const selectedShelter = shelter.selected;
  const selectedPrice = price.selected;
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = email.value;
  const phoneNumberValue = phoneNumber.value;

  const selectedShelterError = shelter.errorMsg;
  const selectedPriceError = price.errorMsg;
  const firstNameError = firstName.errorMsg;
  const lastNameError = lastName.errorMsg;
  const emailError = email.errorMsg;
  const phoneNumberError = phoneNumber.errorMsg;

  const isAnyError =
    !!phoneNumberError ||
    !!emailError ||
    !!lastNameError ||
    !!firstNameError ||
    !!selectedPriceError ||
    !!selectedShelterError;

  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleSubmitForm = () => {
    if (selectedShelterError) {
      dispatch(setFieldError("shelter", ""));
    }

    if (selectedPriceError) {
      dispatch(setFieldError("price", ""));
    }

    if (firstNameError) {
      dispatch(setFieldError("firstName", ""));
    }

    if (lastNameError) {
      dispatch(setFieldError("lastName", ""));
    }

    if (emailError) {
      dispatch(setFieldError("email", ""));
    }

    if (phoneNumberError) {
      dispatch(setFieldError("phoneNumber", ""));
    }

    let error = false;

    if (
      selectedTypeOfSupport === 0 &&
      selectedShelter === SHELTER_DEFAULT_OPTION
    ) {
      error = true;
      dispatch(
        setFieldError("shelter", "Vyberte útulok, ktorému chcete pômocť.")
      );
    }

    if (selectedPrice === null) {
      error = true;
      dispatch(setFieldError("price", "Vyberte sumu, ktorou chcete prispieť"));
    }

    // check and set errors
    if (firstNameValue && !firstNameValue.trim().match(REGEX.firstName)) {
      dispatch(
        setFieldError("firstName", "Vaše meno musí byť v rozmedzí 2-20 znakov")
      );
      error = true;
    }

    if (!lastNameValue.trim().match(REGEX.lastName)) {
      dispatch(
        setFieldError(
          "lastName",
          "Toto pole je povinné. Vaše priezvysko musí byť v rozmedzí 2-30 znakov"
        )
      );
      error = true;
    }

    if (emailValue && !emailValue.trim().match(REGEX.email)) {
      dispatch(
        setFieldError(
          "email",
          "Váš e-mail musí mať platný formát. Napr. dog@goodboy.sk"
        )
      );
      error = true;
    }

    if (phoneNumberValue && !phoneNumberValue.trim().match(REGEX.phoneNumber)) {
      dispatch(
        setFieldError(
          "phoneNumber",
          "Zadajte slovenské alebo české telefónne číslo vo formáte +421/+420 xxx xxx xxx"
        )
      );

      error = true;
    }

    if (error) {
      return;
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        history.push("/vase-kontaktne-informacie");
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  });

  return (
    <SupportFormLayout title="Skontrolujte si zadané údaje" currentStep={3}>
      <InputSubtitleWrapper>
        <SummaryList>
          <SummaryListItem>
            <SubtitleH4>Akou formou chcem pomôcť</SubtitleH4>
            <Text>{(TYPE_OF_SUPPORT as any)[typeOfSupport.value]}</Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Najviac mi záleží na útulku</SubtitleH4>
            <Text error={!!selectedShelterError}>
              {selectedShelterError
                ? selectedShelterError
                : selectedShelter === SHELTER_DEFAULT_OPTION
                ? "Nebol vybraný žiadny konkrétny útulok"
                : selectedShelter.label}
            </Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Suma ktorou chcem pomôcť</SubtitleH4>
            <Text error={!!selectedPriceError}>
              {selectedPriceError ? selectedPriceError : selectedPrice.value} €
            </Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Meno a priezvisko</SubtitleH4>
            <Text error={!!firstNameError || !!lastNameError}>
              {firstNameError || lastNameError
                ? "Priezvysko je povinné pole a musí byť v rozmedzí 2-30 znakov. Krstné meno musí byť v rozmedzí 2-20 znakov."
                : getFullName(firstNameValue, lastNameValue)}
            </Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>E-mailová adresa</SubtitleH4>
            <Text error={!!emailError}>
              {emailError ? emailError : emailValue ? emailValue : "-"}
            </Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Telefónne číslo</SubtitleH4>
            <Text error={!!phoneNumberError}>
              {phoneNumberError
                ? phoneNumberError
                : phoneNumberValue
                ? phoneNumberValue
                : "-"}
            </Text>
          </SummaryListItem>
        </SummaryList>
      </InputSubtitleWrapper>
      <ButtonsWrapper>
        <Button
          text="Odoslať formulár"
          handleOnClick={handleSubmitForm}
          disabled={isAnyError}
        />
        <Button
          text="Späť"
          buttonStyle="secondary"
          handleOnClick={() => history.push("/vase-kontaktne-informacie")}
        />
      </ButtonsWrapper>
    </SupportFormLayout>
  );
};

export default SupportFormStepThree;
