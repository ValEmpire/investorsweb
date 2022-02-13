import {
  CREATE_INVESTMENT,
  ALL_INVESTMENTS,
  SET_INVESTMENT_AMOUNT,
  SET_PAYMENT_METHOD,
  FIND_PROJECT_INVESTMENT,
} from "../../const";

const initialState = {
  amount: "0.00",
  investments: [],
  paymentMethod: false,
  isProjectInvested: null,
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

    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case FIND_PROJECT_INVESTMENT:
      return {
        ...state,
        isProjectInvested: action.payload,
      };

    default:
      return { ...state };
  }
};
