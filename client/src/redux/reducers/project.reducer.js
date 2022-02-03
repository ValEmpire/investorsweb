import { CREATE_PROJECT } from "../../const";

const initialState = {
  name: "",
  location: "",
  targetFund: "",
  story: "",
  website: "",
  industry: "",
  deadline: "",
  minInvestment: "",
};

export const project = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      // get property name
      const fieldName = Object.keys(action.payload)[0];

      // get property value
      const fieldValue = action.payload[fieldName];

      return {
        ...state,
        [fieldName]: fieldValue,
      };

    default:
      return { ...state };
  }
};
