import {
  CREATE_INVESTMENT,
  SET_INVESTMENT_AMOUNT,
  SET_PAYMENT_METHOD,
  FIND_PROJECT_INVESTMENT,
  SUCCESSFUL_INVESTMENT,
  ALL_USER_INVESTMENTS,
} from "../../const";

const initialState = {
  amount: "0.00",
  investments: [],
  investment: {},
  paymentMethod: false,
  isProjectInvested: null,
  userInvestments: [],
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

    case ALL_USER_INVESTMENTS:
      return {
        ...state,
        userInvestments: action.payload,
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
      const { isFound, investment } = action.payload;

      return {
        ...state,
        isProjectInvested: isFound,
        investment,
      };

    case SUCCESSFUL_INVESTMENT:
      return {
        ...state,
        isProjectInvested: true,
        investment: {
          ...state.investment,
          amount: action.payload,
        },
      };

    default:
      return { ...state };
  }
};
