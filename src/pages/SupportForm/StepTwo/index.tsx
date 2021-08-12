import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import InputText from "../../../components/InputText";
import SupportFormLayout, {
  ButtonsWrapper,
  InputSubtitleWrapper,
  InputWrapper,
  Subtitle,
} from "../Layout";

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

  const error = true;

  const validation = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneNumberError("");

    if (error) {
      setFirstNameError("Vaše meno musí byť v rozmedzí 2-20 znakov");
      setLastNameError(
        "Toto pole je povinné. Vaše priezvysko musí byť v rozmedzí 2-30 znakov"
      );
      setEmailError("Váš e-mail musí mať platný formát. Napr. dog@goodboy.sk");
      setPhoneNumberError(
        "Zadajte slovenské alebo české telefónne číslo vo formáte +421/+420 xxx xxx xxx"
      );
      return;
    }

    history.push("/zhrnutie-pomoci");
  };

  const regex = {
    fistName: /^.{2,20}$/,
    lastName: /^.{2,30}$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  };

  return (
    <SupportFormLayout
      title="Potrebujeme od Vás zopár informácií"
      currentStep={2}
    >
      <InputSubtitleWrapper>
        <Subtitle>O vás</Subtitle>
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
        <Button text="Pokračovať" handleOnClick={validation} />
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
