import { SET_WINDOW_WIDTH } from "../../const";

const initialState = {
  width: null,
};

export const layout = (state = initialState, action) => {
  switch (action.type) {
    case SET_WINDOW_WIDTH:
      return {
        ...state,
        width: action.payload,
      };

    default:
      return { ...state };
  }
};
