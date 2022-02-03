import { REGISTER_USER } from "../../const";

const initialState = {
  isAuthenticated: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return { ...state };
  }
};
