import { PRICE_OPTIONS, SHELTER_DEFAULT_OPTION } from "../../config";

/*export type FieldNamesValue =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber";

export type FieldNamesError =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "price"
  | "shelter"
  | "confirmation";*/

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
    /*case "SET_TYPE_OF_SUPPORT": {
      return {
        ...state,
        typeOfSupport: { ...state.typeOfSupport, value: action.payload },
      };
    }
    case "SET_SELECTED_SHELTER": {
      return {
        ...state,
        shelter: { ...state.shelter, selected: action.payload },
      };
    }
    case "SET_SELECTED_PRICE": {
      return {
        ...state,
        price: { ...state.price, selected: action.payload },
      };
    }
    case "SET_CONFIRMATION": {
      return {
        ...state,
        confirmation: { ...state.confirmation, value: action.payload },
      };
    }*/
    default:
      return state;
  }
};

export default formReducer;
