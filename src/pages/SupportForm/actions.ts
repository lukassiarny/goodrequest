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

export const resetForm = () => ({
  type: "RESET_FORM",
});
