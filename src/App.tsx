import React from "react";
import { Route, Switch } from "react-router";
import FooterComponent from "./components/FooterComponent";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import SupportFormStepOne from "./pages/SupportForm/StepOne";
import SupportFormStepThree from "./pages/SupportForm/StepThree";
import SupportFormStepTwo from "./pages/SupportForm/StepTwo";
import {
  Footer,
  Header,
  Main,
  LayoutWrapper,
  LayoutMainContent,
} from "./theme/layout";

const App: React.FC = () => {
  return (
    <LayoutWrapper>
      <LayoutMainContent>
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
            <Route exact path="/zhrnutie-pomoci">
              <SupportFormStepThree />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Main>
      </LayoutMainContent>
      <Footer>
        <FooterComponent />
      </Footer>
    </LayoutWrapper>
  );
};

export default App;
