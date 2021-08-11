import React from "react";
import { Route, Switch } from "react-router";
import FooterComponent from "./components/FooterComponent";
import Navbar from "./components/Navbar";
import SupportFormStepOne from "./pages/SupportForm/StepOne";
import SupportFormStepThree from "./pages/SupportForm/StepThree";
import SupportFormStepTwo from "./pages/SupportForm/StepTwo";
import { Footer, Header, Main } from "./theme/layout";

const App: React.FC = () => {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <Main>
        <Switch>
          <Route exact path="/">
            <SupportFormStepOne />
          </Route>
          <Route exact path="/vase-kontaktne-informacie">
            <SupportFormStepTwo />
          </Route>
          <Route exact path="/zhrnutie">
            <SupportFormStepThree />
          </Route>
        </Switch>
      </Main>
      <Footer>
        <FooterComponent />
      </Footer>
    </>
  );
};

export default App;
