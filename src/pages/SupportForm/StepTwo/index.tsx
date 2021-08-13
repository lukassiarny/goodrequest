import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import Button from "../../../components/Button";
import InputText from "../../../components/InputText";
import { setFieldError, setFieldValue } from "../actions";
import SupportFormLayout, {
  ButtonsWrapper,
  InputSubtitleWrapper,
  InputWrapper,
  SubtitleH4,
} from "../Layout";
import { fieldSelector } from "../selectors";
import { REGEX } from "../../../config";

const SupportFormStepTwo: React.FC = () => {
  const reduxFirstName = useAppSelector((state: RootState) =>
    fieldSelector(state, { fieldName: "firstName" })
  );

  const reduxLastName = useAppSelector((state: RootState) =>
    fieldSelector(state, { fieldName: "lastName" })
  );

  const reduxEmail = useAppSelector((state: RootState) =>
    fieldSelector(state, { fieldName: "email" })
  );

  const reduxPhoneNumber = useAppSelector((state: RootState) =>
    fieldSelector(state, { fieldName: "phoneNumber" })
  );

  const firstName = reduxFirstName.value;
  const lastName = reduxLastName.value;
  const email = reduxEmail.value;
  const phoneNumber = reduxPhoneNumber.value;

  const firstNameError = reduxFirstName.errorMsg;
  const lastNameError = reduxLastName.errorMsg;
  const emailError = reduxEmail.errorMsg;
  const phoneNumberError = reduxPhoneNumber.errorMsg;

  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleChangePage = (route: string) => {
    if (
      firstNameError &&
      firstName &&
      firstName.trim().match(REGEX.firstName)
    ) {
      dispatch(setFieldError("firstName", ""));
    }

    if (lastNameError && lastName.trim().match(REGEX.lastName)) {
      dispatch(setFieldError("lastName", ""));
    }

    if (emailError && email && email.trim().match(REGEX.email)) {
      dispatch(setFieldError("email", ""));
    }

    if (
      phoneNumberError &&
      phoneNumber &&
      phoneNumber.trim().match(REGEX.phoneNumber)
    ) {
      dispatch(setFieldError("phoneNumber", ""));
    }

    history.push(route);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleChangePage("/zhrnutie-pomoci");
      }

      if (e.key === "ArrowLeft") {
        handleChangePage("/");
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
            handleBlur={(value: string) =>
              dispatch(setFieldValue("firstName", value))
            }
            errorMsg={firstNameError}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText
            value={lastName}
            label="Priezvysko"
            placeholder="Zadajte Vaše priezvysko"
            handleBlur={(value: string) =>
              dispatch(setFieldValue("lastName", value))
            }
            errorMsg={lastNameError}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText
            value={email}
            label="E-mailová adresa"
            placeholder="Zadajte Váš e-mail"
            handleBlur={(value: string) =>
              dispatch(setFieldValue("email", value))
            }
            errorMsg={emailError}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText
            inputType="phone"
            value={phoneNumber}
            label="Telefónne číslo"
            placeholder="+421"
            handleBlur={(value: string) =>
              dispatch(setFieldValue("phoneNumber", value))
            }
            errorMsg={phoneNumberError}
          />
        </InputWrapper>
      </InputSubtitleWrapper>
      <ButtonsWrapper>
        <Button
          text="Pokračovať"
          handleOnClick={() => handleChangePage("/zhrnutie-pomoci")}
        />
        <Button
          text="Späť"
          buttonStyle="secondary"
          handleOnClick={() => handleChangePage("/")}
        />
      </ButtonsWrapper>
    </SupportFormLayout>
  );
};

export default SupportFormStepTwo;
