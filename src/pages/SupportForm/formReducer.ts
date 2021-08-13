import { PRICE_OPTIONS, SHELTER_DEFAULT_OPTION } from "../../config";

export type FieldNames =
  | "typeOfSupport"
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "price"
  | "shelter"
  | "confirmation";

const initialState = {
  typeOfSupport: {
    value: 0,
    errorMsg: "",
  },
  shelter: {
    value: SHELTER_DEFAULT_OPTION,
    errorMsg: "",
  },
  price: {
    value: PRICE_OPTIONS[0],
    errorMsg: "",
  },
  firstName: {
    value: "",
    errorMsg: "",
  },
  lastName: {
    value: "",
    errorMsg: "",
  },
  email: {
    value: "",
    errorMsg: "",
  },
  phoneNumber: {
    value: "",
    errorMsg: "",
  },
  confirmation: {
    value: false,
    errorMsg: "",
  },
};

type FormState = typeof initialState;

const formReducer = (state: FormState = initialState, action: any) => {
  switch (action.type) {
    case "SET_FIELD_VALUE": {
      const { value, fieldName } = action.payload;
      return {
        ...state,
        [fieldName]: { ...(state as any)[fieldName], value },
      };
    }
    case "SET_ERROR_MSG": {
      const { errorMsg, fieldName } = action.payload;
      return {
        ...state,
        [fieldName]: { ...(state as any)[fieldName], errorMsg },
      };
    }
    case "RESET_FORM": {
      return initialState;
    }
    default:
      return state;
  }
};

export default formReducer;
