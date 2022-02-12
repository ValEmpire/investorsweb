import {
  ADD_CARD,
  ALL_CARDS,
  DELETE_CARD,
  CREATE_PAYMENT_INTENT,
  ADD_LINK,
} from "../../const";

const initialState = {
  cards: [],
  primaryCard: {},
  clientSecret: "",
  link: "",
};

export const stripe = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CARDS:
      return {
        ...state,
        cards: action.payload,
        primaryCard: action.pc,
      };

    case ADD_CARD:
      if (action.payload.default_for_currency) {
        return {
          ...state,
          primaryCard: action.payload,
        };
      }

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

    default:
      return { ...state };
  }
};
