import {
  CREATE_INVESTMENT,
  ALL_INVESTMENTS,
  SET_INVESTMENT_AMOUNT,
} from "../../const";

const initialState = {
  amount: "0.00",
  investments: [],
};

export const investment = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_INVESTMENT:
      const fieldName = Object.keys(action.payload)[0];
      const fieldValue = action.payload[fieldName];

      return {
        ...state,
        [fieldName]: fieldValue,
      };

    case ALL_INVESTMENTS:
      return {
        investments: action.payload,
      };

    case SET_INVESTMENT_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };

    default:
      return { ...state };
  }
};
