const initialState = {
  firstName: {
    value: "",
    error: "",
  },
};

const formReducer = (state = initialState, action: any) => {
  if (!action) return state;
  return state;
};

export default formReducer;
