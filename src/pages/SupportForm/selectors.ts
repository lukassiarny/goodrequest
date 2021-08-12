import { createSelector } from "reselect";
import { RootState } from "../../app/store";
import { FieldNames } from "./formReducer";

export const formSelector = (state: RootState) => {
  return state.form;
};

export const fieldSelector = createSelector(
  formSelector,
  (_: RootState, { fieldName }: { fieldName: FieldNames }) => ({ fieldName }),
  (formState, { fieldName }) => {
    return (formState as any)[fieldName] || null;
  }
);
