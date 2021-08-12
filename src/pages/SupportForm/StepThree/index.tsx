import { rem } from "polished";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import SupportFormLayout, {
  ButtonsWrapper,
  InputSubtitleWrapper,
  SubtitleH4,
} from "../Layout";

const SummaryList = styled.ul``;

const SummaryListItem = styled.li`
  &:not(:last-of-type) {
    margin-bottom: ${rem(24)};
  }
`;

const Text = styled.span`
  margin-top: ${rem(8)};
  display: inline-block;
  line-height: ${rem(19)};
`;

const SupportFormStepThree: React.FC = () => {
  const history = useHistory();

  const handleSubmitForm = () => {};

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
            <Text>Chcem finančne prispieť celej nadácii</Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Najviac mi záleží na útulku</SubtitleH4>
            <Text>Mestský útulok, Žilina</Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Suma ktorou chcem pomôcť</SubtitleH4>
            <Text>50 €</Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Meno a priezvisko</SubtitleH4>
            <Text>Peter Reguli</Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>E-mailová adresa</SubtitleH4>
            <Text>peter.reguli@goodrequest.com</Text>
          </SummaryListItem>
          <SummaryListItem>
            <SubtitleH4>Telefónne číslo</SubtitleH4>
            <Text>+421 902 237 207</Text>
          </SummaryListItem>
        </SummaryList>
      </InputSubtitleWrapper>
      <ButtonsWrapper>
        <Button text="Odoslať formulár" handleOnClick={handleSubmitForm} />
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
