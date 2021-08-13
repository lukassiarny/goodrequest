import { Option } from "../../components/InputSelect";
import { OptionPrice } from "../../components/InputSelectPrice";
import { FieldNames } from "./formReducer";

export const setFieldValue = (
  fieldName: FieldNames,
  value: string | number | boolean | Option | OptionPrice | null
) => ({
  type: "SET_FIELD_VALUE",
  payload: { value, fieldName },
});

export const setFieldError = (fieldName: FieldNames, errorMsg: string) => ({
  type: "SET_ERROR_MSG",
  payload: { fieldName, errorMsg },
});

/*export const setTypeOfSupport = (value: number) => ({
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

export const setConfirmation = (value: boolean) => ({
  type: "SET_CONFIRMATION",
  payload: value,
});*/
