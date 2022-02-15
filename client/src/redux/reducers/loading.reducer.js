import { SET_LOADING_REGISTER, SET_LOADING_LOGIN } from "../../const";

const initialState = {
  loadingRegister: false,
  loadingLogin: false,
};

export const loading = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_REGISTER:
      return {
        ...state,
        loadingRegister: action.payload,
      };

    case SET_LOADING_LOGIN:
      return {
        ...state,
        loadingLogin: action.payload,
      };

    default:
      return { ...state };
  }
};
