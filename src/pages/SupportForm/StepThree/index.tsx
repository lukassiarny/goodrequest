import { rem } from "polished";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Button from "../../../components/Button";
import InputCheckbox from "../../../components/CheckBox";
import {
  REGEX,
  SHELTER_DEFAULT_OPTION,
  TYPE_OF_SUPPORT,
} from "../../../config";
import { resetForm, setFieldError, setFieldValue } from "../actions";
import SupportFormLayout, {
  ButtonsWrapper,
  InputSubtitleWrapper,
} from "../Layout";
import { formSelector } from "../selectors";
import SummaryList from "./SummaryList";
import SummaryListItem from "./SummaryList/SummaryListItem";

const CheckboxWrapper = styled.div`
  margin-top: ${rem(48)};
`;

const FulfilledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getFullName = (firstName: string, lastName: string) => {
  return !firstName && !lastName ? "-" : `${firstName || ""} ${lastName || ""}`;
};

type Contribution = {
  firstName: string;
  lastName: string;
  email: string;
  value: number;
  phone?: string;
  shelterID?: number;
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
    confirmation,
  } = useAppSelector(formSelector);

  const selectedTypeOfSupport = typeOfSupport.value;
  const selectedShelter = shelter.value;
  const selectedPrice = price.value;
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = email.value;
  const phoneNumberValue = phoneNumber.value;
  const confirmationValue = confirmation.value;

  const selectedShelterError = shelter.errorMsg;
  const selectedPriceError = price.errorMsg;
  const firstNameError = firstName.errorMsg;
  const lastNameError = lastName.errorMsg;
  const emailError = email.errorMsg;
  const phoneNumberError = phoneNumber.errorMsg;
  const confirmationError = confirmation.errorMsg;

  const [status, setStatus] = React.useState<
    "idle" | "loading" | "fulfilled" | "error"
  >("idle");

  const isAnyError =
    !!phoneNumberError ||
    !!emailError ||
    !!lastNameError ||
    !!firstNameError ||
    !!selectedPriceError ||
    !!selectedShelterError ||
    !!confirmationError;

  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleSubmitForm = async () => {
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

    if (!confirmationValue) {
      dispatch(
        setFieldError(
          "confirmation",
          "Musíte súhlasiť so spracovaním osobných údajov"
        )
      );

      error = true;
    }

    if (error) {
      return;
    }

    setStatus("loading");

    try {
      const o: Contribution = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phone: phoneNumberValue,
        value: selectedPrice.value,
      };

      if (selectedShelter.value) {
        o.shelterID = selectedShelter.value;
      }

      if (phoneNumberValue) {
        o.phone = phoneNumberValue;
      }

      await fetch(
        "https://frontend-assignment-api.goodrequest.com/api/v1/shelters/contribute",
        {
          method: "POST",
          body: JSON.stringify(o),
        }
      );

      setStatus("fulfilled");
    } catch {
      setStatus("error");
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
    // eslint-disable-next-line
  }, []);

  let content;

  switch (status) {
    case "fulfilled": {
      content = (
        <SupportFormLayout
          title="Ďakujeme za Vašu pomoc. Vaše peniaze budú použité na dobrú vec!"
          currentStep={3}
        >
          <FulfilledWrapper>
            <Button
              text="Chcem prispieť viac"
              handleOnClick={() => {
                dispatch(resetForm());
                history.push("/");
              }}
              buttonStyle="fulfilled"
            />
          </FulfilledWrapper>
        </SupportFormLayout>
      );
      break;
    }
    case "error": {
      content = (
        <SupportFormLayout
          title="Chyba! Pri odosielaní sa niečo pokazilo. Skúste to neskôr prosím..."
          currentStep={3}
        ></SupportFormLayout>
      );
      break;
    }
    default: {
      content = (
        <SupportFormLayout title="Skontrolujte si zadané údaje" currentStep={3}>
          <InputSubtitleWrapper>
            <SummaryList>
              <SummaryListItem title="Akou formou chcem pomôcť">
                {(TYPE_OF_SUPPORT as any)[typeOfSupport.value]}
              </SummaryListItem>
              <SummaryListItem
                title="Najviac mi záleží na útulku"
                error={!!selectedShelterError}
              >
                {selectedShelterError
                  ? selectedShelterError
                  : selectedShelter === SHELTER_DEFAULT_OPTION
                  ? "Nebol vybraný žiadny konkrétny útulok"
                  : selectedShelter.label}
              </SummaryListItem>
              <SummaryListItem
                title="Suma ktorou chcem pomôcť"
                error={!!selectedPriceError}
              >
                {selectedPriceError ? selectedPriceError : selectedPrice.value}{" "}
                €
              </SummaryListItem>
              <SummaryListItem
                title="Meno a priezvisko"
                error={!!firstNameError || !!lastNameError}
              >
                {firstNameError || lastNameError
                  ? "Priezvysko je povinné pole a musí byť v rozmedzí 2-30 znakov. Krstné meno musí byť v rozmedzí 2-20 znakov."
                  : getFullName(firstNameValue, lastNameValue)}
              </SummaryListItem>
              <SummaryListItem title="E-mailová adresa" error={!!emailError}>
                {emailError ? emailError : emailValue ? emailValue : "-"}
              </SummaryListItem>
              <SummaryListItem
                title="Telefónne číslo"
                error={!!phoneNumberError}
              >
                {phoneNumberError
                  ? phoneNumberError
                  : phoneNumberValue
                  ? phoneNumberValue
                  : "-"}
              </SummaryListItem>
            </SummaryList>
            <CheckboxWrapper>
              <InputCheckbox
                label="Súhlasím so spracovaním mojich osobných údajov"
                value={confirmationValue}
                onValueChange={() => {
                  if (confirmationError) {
                    dispatch(setFieldError("confirmation", ""));
                  }

                  dispatch(setFieldValue("confirmation", !confirmationValue));
                }}
                errorMsg={confirmationError}
              />
            </CheckboxWrapper>
          </InputSubtitleWrapper>
          <ButtonsWrapper>
            <Button
              text="Odoslať formulár"
              isLoading={status === "loading"}
              handleOnClick={handleSubmitForm}
              disabled={isAnyError}
            />
            <Button
              text="Späť"
              isLoading={status === "loading"}
              buttonStyle="secondary"
              handleOnClick={() => history.push("/vase-kontaktne-informacie")}
            />
          </ButtonsWrapper>
        </SupportFormLayout>
      );
    }
  }

  return <>{content}</>;
};

export default SupportFormStepThree;
