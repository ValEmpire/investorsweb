import {
  ADD_CARD,
  ALL_CARDS,
  DELETE_CARD,
  CREATE_PAYMENT_INTENT,
  ADD_LINK,
  GET_ACCOUNT,
} from "../../const";

const initialState = {
  cards: [],
  clientSecret: "",
  link: "",
  account: {
    payouts_enabled: null,
  },
};

export const stripe = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CARDS:
      return {
        ...state,
        cards: action.payload,
      };

    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };

    case DELETE_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };

    case CREATE_PAYMENT_INTENT:
      return {
        ...state,
        clientSecret: action.payload,
      };

    case ADD_LINK:
      return {
        ...state,
        link: action.payload,
      };

    case GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };

    default:
      return { ...state };
  }
};
