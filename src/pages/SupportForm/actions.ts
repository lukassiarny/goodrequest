import { Option } from "../../components/InputSelect";
import { OptionPrice } from "../../components/InputSelectPrice";
import { FieldNamesError, FieldNamesValue } from "./formReducer";

export const setFieldValue = (fieldName: FieldNamesValue, value: string) => ({
  type: "SET_FIELD_VALUE",
  payload: { value, fieldName },
});

export const setFieldError = (
  fieldName: FieldNamesError,
  errorMsg: string
) => ({
  type: "SET_ERROR_MSG",
  payload: { fieldName, errorMsg },
});

export const setTypeOfSupport = (value: number) => ({
  type: "SET_TYPE_OF_SUPPORT",
  payload: value,
});

export const setSelectedShelter = (selectedOption: Option) => ({
  type: "SET_SELECTED_SHELTER",
  payload: selectedOption,
});

export const setSelectedPrice = (selectedOption: OptionPrice | null) => ({
  type: "SET_SELECTED_PRICE",
  payload: selectedOption,
});

export const setConfirmation = (checked: boolean) => ({
  type: "SET_CONFIRMATION",
  payload: checked,
});
