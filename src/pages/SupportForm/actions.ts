import { FieldNames } from "./formReducer";

export const setFieldValue = <T>(fieldName: FieldNames, value: T) => ({
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
