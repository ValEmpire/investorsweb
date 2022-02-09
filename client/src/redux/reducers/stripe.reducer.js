import { ALL_CARDS } from "../../const";

const initialState = {
  cards: [],
};

export const stripe = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CARDS:
      return {
        cards: action.payload,
      };

    default:
      return { ...state };
  }
};
