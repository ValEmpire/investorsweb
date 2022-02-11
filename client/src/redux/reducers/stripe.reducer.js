import {
  ADD_CARD,
  ALL_CARDS,
  DELETE_CARD,
  CREATE_PAYMENT_INTENT,
} from "../../const";

const initialState = {
  cards: [],
  primaryCard: {},
  clientSecret: "",
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

    default:
      return { ...state };
  }
};
