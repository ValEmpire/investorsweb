import { SET_ALERT } from "../../const";

const initialState = {
  open: false,
  message: null,
  type: null, //success || error
};

export const alert = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        open: action.payload.open,
        message: action.payload.message,
        type: action.payload.type,
      };

    default:
      return { ...state };
  }
};
