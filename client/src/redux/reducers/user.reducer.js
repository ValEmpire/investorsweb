import { SET_USER } from "../../const";

const initialState = {
  isAuthenticated: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return { ...state };
  }
};
