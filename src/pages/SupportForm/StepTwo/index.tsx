import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import InputText from "../../../components/InputText";
import SupportFormLayout, {
  ButtonsWrapper,
  InputSubtitleWrapper,
  InputWrapper,
  SubtitleH4,
} from "../Layout";

const regex = {
  firstName: /^.{2,20}$/,
  lastName: /^.{2,30}$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phoneNumber: /^(\+42[01])(\s*\d){9}$/,
};

const SupportFormStepTwo: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [phoneNumberError, setPhoneNumberError] = React.useState("");

  const history = useHistory();

  const handleChangeNextPage = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneNumberError("");

    let error = false;

    if (firstName && !firstName.trim().match(regex.firstName)) {
      setFirstNameError("Vaše meno musí byť v rozmedzí 2-20 znakov");
      error = true;
    }

    if (!lastName.trim().match(regex.lastName)) {
      setLastNameError(
        "Toto pole je povinné. Vaše priezvysko musí byť v rozmedzí 2-30 znakov"
      );
      error = true;
    }

    if (email && !email.trim().match(regex.email)) {
      setEmailError("Váš e-mail musí mať platný formát. Napr. dog@goodboy.sk");
      error = true;
    }

    if (phoneNumber && !phoneNumber.trim().match(regex.phoneNumber)) {
      setPhoneNumberError(
        "Zadajte slovenské alebo české telefónne číslo vo formáte +421/+420 xxx xxx xxx"
      );
      error = true;
    }

    if (error) {
      return;
    }

    history.push("/zhrnutie-pomoci");
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleChangeNextPage();
      }

      if (e.key === "ArrowLeft") {
        history.push("/");
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  });

  return (
    <SupportFormLayout
      title="Potrebujeme od Vás zopár informácií"
      currentStep={2}
    >
      <InputSubtitleWrapper>
        <SubtitleH4>O vás</SubtitleH4>
        <InputWrapper>
          <InputText
            value={firstName}
            label="Meno"
            placeholder="Zadajte Vaše meno"
            onValueChange={(value: string) => setFirstName(value)}
            errorMsg={firstNameError}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText
            value={lastName}
            label="Priezvysko"
            placeholder="Zadajte Vaše priezvysko"
            onValueChange={(value: string) => setLastName(value)}
            errorMsg={lastNameError}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText
            value={email}
            label="Meno"
            placeholder="Zadajte Váš e-mail"
            onValueChange={(value: string) => setEmail(value)}
            errorMsg={emailError}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText
            inputType="phone"
            value={phoneNumber}
            label="Telefónne číslo"
            placeholder="+421"
            onValueChange={(value: string) => setPhoneNumber(value)}
            errorMsg={phoneNumberError}
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <ButtonsWrapper>
        <Button text="Pokračovať" handleOnClick={handleChangeNextPage} />
        <Button
          text="Späť"
          buttonStyle="secondary"
          handleOnClick={() => history.push("/")}
        />
      </ButtonsWrapper>
    </SupportFormLayout>
  );
};

export default SupportFormStepTwo;
