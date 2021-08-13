import { Option } from "./components/InputSelect";
import { OptionPrice } from "./components/InputSelectPrice";

export const SHELTER_DEFAULT_OPTION: Option = {
  label: "Vyberte útulok zo zoznamu",
  value: null,
};

export const PRICE_OPTIONS: OptionPrice[] = [
  { type: "static", value: 5 },
  { type: "static", value: 10 },
  { type: "static", value: 20 },
  { type: "static", value: 30 },
  { type: "static", value: 50 },
  { type: "static", value: 100 },
];

export const TYPE_OF_SUPPORT: { 0: string; 1: string } = {
  0: "Chcem finančne prispieť konkrétnemu útulku",
  1: "Chcem finančne prispieť celej nadácii",
};

export const REGEX = {
  firstName: /^.{2,20}$/,
  lastName: /^.{2,30}$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phoneNumber: /^(\+42[01])(\s*\d){9}$/,
};
